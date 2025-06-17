import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  leader: {
    userId: string;
    username: string;
    ign: string;
    email: string;
  };
  members: {
    userId: string;
    username: string;
    ign: string;
    email: string;
    confirmed: boolean;
    invitationSentAt: Date;
  }[];
  tournament: string;  // Tournament ID
  registeredAt: Date;
  isComplete: boolean;
  type: 'solo' | 'squad';  // For Free Fire, either solo or squad of 4
}

const TeamSchema = new Schema<ITeam>({
  name: { type: String, required: true },
  leader: {
    userId: { type: String, required: true },
    username: { type: String, required: true },
    ign: { type: String, required: true },
    email: { type: String, required: true }
  },
  members: [{
    userId: { type: String, required: true },
    username: { type: String, required: true },
    ign: { type: String, required: true },
    email: { type: String, required: true },
    confirmed: { type: Boolean, default: false },
    invitationSentAt: { type: Date, default: Date.now }
  }],
  tournament: { type: String, required: true },
  registeredAt: { type: Date, default: Date.now },
  isComplete: { type: Boolean, default: false },
  type: { 
    type: String, 
    enum: ['solo', 'squad'],
    required: true 
  }
});

export default models.Team || model<ITeam>('Team', TeamSchema);
