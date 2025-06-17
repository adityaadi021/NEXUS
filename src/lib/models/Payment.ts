import mongoose, { Schema, Document, models, model } from 'mongoose';

export interface IPayment extends Document {
  userId: mongoose.Types.ObjectId;
  tournamentId: mongoose.Types.ObjectId;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const PaymentSchema = new Schema<IPayment>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  tournamentId: { type: Schema.Types.ObjectId, ref: 'Tournament', required: true },
  amount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

export default models.Payment || model<IPayment>('Payment', PaymentSchema); 