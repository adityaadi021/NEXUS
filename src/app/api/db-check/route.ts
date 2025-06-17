import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    // Check Mongoose connection
    let mongoStatus = 'disconnected';
    if (mongoose.connection.readyState === 1) {
      mongoStatus = 'connected';
    } else {
      await mongoose.connect(process.env.MONGODB_URI!);
      mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    }

    // Check Prisma connection
    let prismaStatus = 'ok';
    try {
      await prisma.$connect();
      await prisma.$disconnect();
    } catch (e) {
      prismaStatus = 'error';
    }

    return NextResponse.json({
      mongoStatus,
      prismaStatus,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}
