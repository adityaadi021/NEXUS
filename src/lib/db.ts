import mongoose from 'mongoose';
import { PrismaClient } from '@prisma/client';
import dns from 'dns';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient();
  }
  // @ts-ignore
  prisma = global.prisma;
}

export { prisma };

declare global {
  var prisma: PrismaClient | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Log connection info (without credentials)
console.log('Environment check:', {
  NODE_ENV: process.env.NODE_ENV,
  MONGODB_URI_EXISTS: !!MONGODB_URI,
  MONGODB_URI_PREFIX: MONGODB_URI.substring(0, MONGODB_URI.indexOf('://')+3) + '...',
});

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

// Use the original connection string
const uri = MONGODB_URI;

// Extract and log connection string components
try {
  const uriParts = uri.match(/mongodb(\+srv)?:\/\/([^:]+):([^@]+)@([^/]+)\/([^?]+)/);
  if (uriParts) {
    const [, srv, username, password, hostname, database] = uriParts;
    console.log('Connection string analysis:', {
      format: srv ? 'SRV' : 'Standard',
      username: username,
      hostname: hostname,
      database: database,
      hasPassword: !!password
    });
  } else {
    console.error('Invalid connection string format');
  }
} catch (error) {
  console.error('Error parsing connection string:', error);
}

// Extract hostname for DNS check
const hostnameMatch = uri.match(/@([^/]+)/);
const hostname = hostnameMatch ? hostnameMatch[1] : null;

if (hostname) {
  console.log('Checking DNS resolution for hostname:', hostname);
  dns.lookup(hostname, (err, address, family) => {
    if (err) {
      console.error('DNS lookup failed:', {
        hostname,
        error: err.message,
        code: err.code
      });
    } else {
      console.log('DNS lookup successful:', {
        hostname,
        address,
        family
      });
    }
  });
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

const cached: MongooseCache = {
  conn: null,
  promise: null
};

async function dbConnect() {
  if (cached.conn) {
    if (cached.conn.connection.readyState === 1) {
      console.log('Using cached database connection');
      return cached.conn;
    } else {
      console.log('Cached connection is not ready, creating new connection');
      cached.conn = null;
      cached.promise = null;
    }
  }

  if (!cached.promise) {
    console.log('Initializing new database connection...');
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 30000,
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      retryReads: true,
      connectTimeoutMS: 30000,
      heartbeatFrequencyMS: 10000,
      // Add these options for better reliability
      autoIndex: true,
      autoCreate: true,
      maxIdleTimeMS: 60000,
      minPoolSize: 5,
      waitQueueTimeoutMS: 30000,
      w: 'majority',
      wtimeoutMS: 2500,
      readPreference: 'primary',
    };

    cached.promise = mongoose.connect(uri, opts)
      .then((mongoose) => {
        console.log('Database connection established');
        return mongoose;
      })
      .catch((error) => {
        console.error('Database connection error:', error);
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
    return cached.conn;
  } catch (error) {
    console.error('Failed to establish database connection:', error);
    throw error;
  }
}

// Add connection event listeners
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to database');
});

mongoose.connection.on('error', (err) => {
  console.error('Mongoose connection error:', {
    name: err.name,
    message: err.message,
    code: err.code,
    stack: err.stack,
    uri: uri.replace(/\/\/[^:]+:[^@]+@/, '//***:***@') // Mask credentials in URI
  });
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from database');
  // Attempt to reconnect
  setTimeout(() => {
    console.log('Attempting to reconnect to MongoDB...');
    dbConnect().catch(console.error);
  }, 5000);
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error during mongoose connection closure:', err);
    process.exit(1);
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  // Application specific logging, throwing an error, or other logic here
});

declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

export { dbConnect, dbConnect as connectDB };
export default dbConnect;