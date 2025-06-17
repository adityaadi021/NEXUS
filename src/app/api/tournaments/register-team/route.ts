import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import Team from '@/lib/models/Team';
import Tournament from '@/lib/models/Tournament';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { tournamentId, teamName, teamType, members } = body;

    await connectDB();

    // Verify tournament exists and has slots
    const tournament = await Tournament.findById(tournamentId);
    if (!tournament) {
      return NextResponse.json({ error: 'Tournament not found' }, { status: 404 });
    }
    if (tournament.remainingSlots <= 0) {
      return NextResponse.json({ error: 'No slots available' }, { status: 400 });
    }

    // Create the team
    const team = await Team.create({
      name: teamName,
      type: teamType,
      tournament: tournamentId,
      leader: {
        userId: session.user.id,
        username: session.user.name,
        ign: body.leaderIgn,
        email: session.user.email
      },
      members: members.map((member: any) => ({
        userId: member.userId || null,
        username: member.username,
        ign: member.ign,
        email: member.email,
        confirmed: false
      }))
    });

    // Update tournament slots
    await Tournament.findByIdAndUpdate(tournamentId, {
      $inc: { registeredTeams: 1, remainingSlots: -1 }
    });

    // TODO: Send email notifications to team members
    // This should be implemented based on your email service provider

    return NextResponse.json({ 
      success: true, 
      teamId: team._id 
    });
  } catch (error: any) {
    console.error('Error registering team:', error);
    return NextResponse.json(
      { error: 'Failed to register team' },
      { status: 500 }
    );
  }
}
