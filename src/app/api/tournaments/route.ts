import { NextResponse } from "next/server";
import Tournament from "@/lib/models/Tournament";
import dbConnect from "@/lib/db";

export async function POST(req: Request) {
  await dbConnect();
  try {
    const body = await req.json();
    const {
      name,
      gameTitle,
      image,
      description,
      startDate,
      endDate,
      minTeamSize,
      maxTeamSize,
      maxTeams,
      entryFee,
      streamLink,
    } = body;

    // Basic validation
    if (!name || !gameTitle || !startDate || !endDate || !maxTeams || !entryFee || !minTeamSize || !maxTeamSize) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    // Date validation
    if (new Date(startDate) >= new Date(endDate)) {
      return NextResponse.json(
        { error: "End date must be after start date." },
        { status: 400 }
      );
    }

    // Team size validation
    if (minTeamSize > maxTeamSize) {
      return NextResponse.json(
        { error: "Minimum team size cannot be greater than maximum team size." },
        { status: 400 }
      );
    }

    const newTournament = new Tournament({
      name,
      gameTitle,
      image,
      description,
      startDate,
      endDate,
      minTeamSize,
      maxTeamSize,
      maxTeams,
      entryFee,
      streamLink,
      registeredTeams: 0,
      status: 'upcoming',
      prizes: [],
      comments: [],
      matches: [],
      teams: [],
    });

    await newTournament.save();

    return NextResponse.json({
      message: "Tournament created successfully!",
      tournament: newTournament,
    }, { status: 201 });

  } catch (error: any) {
    console.error("Tournament creation error:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();
  try {
    const tournaments = await Tournament.find({ createdBy: "admin" })
      .sort({ startDate: 1 })
      .select('-comments -matches -teams'); // Exclude large sub-documents by default

    return NextResponse.json({ tournaments });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET_DETAILED(req: Request) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { error: "Tournament ID is required." },
        { status: 400 }
      );
    }

    const tournament = await Tournament.findById(id);
    
    if (!tournament) {
      return NextResponse.json(
        { error: "Tournament not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ tournament });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}