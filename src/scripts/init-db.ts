import dbConnect from '@/lib/db';
import User from '@/lib/models/User';
import bcrypt from 'bcryptjs';

async function initializeDatabase() {
  try {
    console.log('Connecting to database...');
    await dbConnect();
    console.log('Connected to database');

    // Check if admin user exists
    const adminExists = await User.findOne({ email: 'admin@nexus.com' });
    
    if (!adminExists) {
      console.log('Creating admin user...');
      const hashedPassword = await bcrypt.hash('admin123', 10);
      
      await User.create({
        username: 'admin',
        email: 'admin@nexus.com',
        password: hashedPassword,
        isAdmin: true
      });
      
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Count total users
    const userCount = await User.countDocuments();
    console.log(`Total users in database: ${userCount}`);

    process.exit(0);
  } catch (error) {
    console.error('Database initialization failed:', error);
    process.exit(1);
  }
}

initializeDatabase(); 