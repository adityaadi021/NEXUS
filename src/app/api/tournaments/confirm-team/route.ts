import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Team from '@/lib/models/Team';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { teamId } = body;

    await connectDB();

    // Find the team and update the member's confirmation
    const team = await Team.findOneAndUpdate(
      { 
        _id: teamId,
        'members.email': session.user.email 
      },
      { 
        $set: { 
          'members.$.confirmed': true,
          'members.$.userId': session.user.id
        } 
      },
      { new: true }
    );

    if (!team) {
      return NextResponse.json(
        { error: 'Team not found or user not in team' },
        { status: 404 }
      );
    }

    // Check if all members have confirmed
    const allConfirmed = team.members.every(member => member.confirmed);
    if (allConfirmed) {
      team.isComplete = true;
      await team.save();
    }

    return NextResponse.json({ 
      success: true,
      isTeamComplete: team.isComplete
    });
  } catch (error: any) {
    console.error('Error confirming team membership:', error);
    return NextResponse.json(
      { error: 'Failed to confirm team membership' },
      { status: 500 }
    );
  }
}
