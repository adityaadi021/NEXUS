export interface Tournament {
  id: string;
  gameTitle: string;
  name: string;
  startDate: string;
  endDate: string;
  entryFee: number;
  maxSlots: number;
  availableSlots: number;
  description: string;
  image: string;
  imageAiHint?: string;
  minTeamSize: number;
  maxTeamSize: number;
  rules?: string[];
}

export interface Player {
  name: string;
  ign: string; // In-Game Name
  email: string;
  teamName?: string;
}

export interface Booking {
  tournamentId: string;
  player: Player;
  bookingDate: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
}
