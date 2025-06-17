import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  leader: string;
  members: string[];
  confirmed: boolean;
}

export interface ITournament extends Document {
  name: string;
  startDate: Date;
  endDate: Date;
  gameTitle: string;
  image?: string;
  description: string;
  entryFee: number;
  maxTeams: number;
  minTeamSize: number;
  maxTeamSize: number;
  registeredTeams: number;
  createdAt: Date;
  updatedAt: Date;
  streamLink?: string;
  status: 'upcoming' | 'live' | 'completed';
  prizes: {
    position: number;
    reward: string;
    awarded: boolean;
    awardedTo?: string;
  }[];
  comments: {
    userId: string;
    username: string;
    comment: string;
    createdAt: Date;
  }[];
  matches: {
    matchId: string;
    name: string;
    startDate: Date;
    endDate: Date;
    streamLink?: string;
    status: 'upcoming' | 'live' | 'completed';
    teams: {
      teamId: string;
      teamName: string;
      members: string[];
      confirmed: boolean;
    }[];
  }[];
  teams: ITeam[];
}

const TeamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true },
    leader: { type: String, required: true },
    members: [{ type: String }],
    confirmed: { type: Boolean, default: false },
  },
  { _id: false }
);

const TournamentSchema = new Schema<ITournament>({
  name: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  gameTitle: { type: String, required: true },
  image: { type: String },
  description: { type: String, required: true },
  entryFee: { type: Number, required: true },
  maxTeams: { type: Number, required: true },
  minTeamSize: { type: Number, required: true },
  maxTeamSize: { type: Number, required: true },
  registeredTeams: { type: Number, default: 0 },
  streamLink: { type: String },
  status: { 
    type: String, 
    enum: ['upcoming', 'live', 'completed'], 
    default: 'upcoming' 
  },
  prizes: [{
    position: { type: Number, required: true },
    reward: { type: String, required: true },
    awarded: { type: Boolean, default: false },
    awardedTo: { type: String }
  }],
  comments: [{
    userId: { type: String, required: true },
    username: { type: String, required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
  }],
  matches: [{
    matchId: { type: String, required: true },
    name: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    streamLink: { type: String },
    status: { 
      type: String, 
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming'
    },
    teams: [{
      teamId: { type: String, required: true },
      teamName: { type: String, required: true },
      members: [{ type: String }],
      confirmed: { type: Boolean, default: false }
    }]
  }],
  teams: { type: [TeamSchema], default: [] }
}, { timestamps: true });

// Add type declarations for Tournament
const Tournament = models.Tournament || model<ITournament>("Tournament", TournamentSchema);

export default Tournament;