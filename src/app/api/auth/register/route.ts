import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { username, email, password } = await request.json();

    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields.' },
        { status: 400 }
      );
    }

    // In a real application, you would:
    // 1. Hash the password before storing it
    // 2. Save user data to a database
    // 3. Check for existing users with the same email/username
    // 4. Implement proper authentication mechanisms (e.g., JWT, sessions)

    // For now, simulate a successful registration
    console.log(`Registering user: ${username}, ${email}`);

    return NextResponse.json({
      success: true,
      message: 'User registered successfully.',
      user: { username, email }, // Return limited user data
    });

  } catch (error) {
    console.error('Error in /api/auth/register:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error.' },
      { status: 500 }
    );
  }
} 