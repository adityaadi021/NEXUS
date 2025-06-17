import type { Tournament } from './types';

// 'mockTournaments' is now a module-level variable that can be mutated by server actions.
export let mockTournaments: Tournament[] = [
  {
    id: 'ff-clash-101',
    gameTitle: 'Free Fire',
    name: 'Nexus FF Clash Series Season 1',
    startDate: 'NOT YET',
    endDate: 'NOT YET',
    entryFee: 50,
    maxSlots: 72,
    availableSlots: 1, // 1 slot available for Season 1
    description: 'Join the ultimate Free Fire battle! Squad up and fight for glory and exciting prizes. Intense matches guaranteed.',
    image: 'https://placehold.co/600x400.png',
    imageAiHint: 'esports battle',
    minTeamSize: 4,
    maxTeamSize: 5,
    rules: [
      'Teams must have 4-5 players',
      'All players must be present 15 minutes before match time',
      'No teaming or cheating allowed',
      'Tournament will be played in Squad mode',
      'Teams can register with 4 players and add a 5th player later'
    ]
  },
  {
    id: 'sunday-clash',
    gameTitle: 'Free Fire',
    name: 'Sunday Clash',
    startDate: 'NOT YET',
    endDate: 'NOT YET',
    entryFee: 0, // Free entry
    maxSlots: 8,
    availableSlots: 1, // 1 slot available for Sunday Clash
    description: 'Weekly Sunday Clash tournament! Perfect for weekend warriors. Show your skills and win exciting prizes every Sunday.',
    image: 'https://placehold.co/600x400.png',
    imageAiHint: 'sunday gaming tournament',
    minTeamSize: 4,
    maxTeamSize: 5,
    rules: [
      'Teams must have 4-5 players',
      'All players must be present 15 minutes before match time',
      'No teaming or cheating allowed',
      'Tournament will be played in Squad mode',
      'Teams can register with 4 players and add a 5th player later'
    ]
  },
  {
    id: 'scrim-night-weekly',
    gameTitle: 'Free Fire',
    name: 'Weekly Scrim Night',
    startDate: 'NOT YET',
    endDate: 'NOT YET',
    entryFee: 0, // Free entry
    maxSlots: 12,
    availableSlots: 0, // No slots available
    description: 'Practice and hone your team skills in our weekly scrims. Perfect for competitive teams looking to improve.',
    image: 'https://placehold.co/600x400.png',
    imageAiHint: 'team strategy',
    minTeamSize: 4,
    maxTeamSize: 5,
    rules: [
      'Teams must have 4-5 players',
      'All players must be present 15 minutes before match time',
      'No teaming or cheating allowed',
      'Tournament will be played in Squad mode',
      'Teams can register with 4 players and add a 5th player later'
    ]
  },
];

export const getTournamentById = (id: string): Tournament | undefined => {
  return mockTournaments.find(tournament => tournament.id === id);
};

// This function now mutates the module-level 'mockTournaments' array.
// It should primarily be called from server-side logic (like Server Actions).
export const decrementTournamentSlot = (tournamentId: string): void => {
  const tournamentIndex = mockTournaments.findIndex(t => t.id === tournamentId);
  if (tournamentIndex !== -1) {
    if (mockTournaments[tournamentIndex].availableSlots > 0) {
      mockTournaments[tournamentIndex].availableSlots -= 1;
      console.log(`Slot decremented for ${tournamentId} on server. New count: ${mockTournaments[tournamentIndex].availableSlots}`);
    } else {
      console.log(`Attempted to decrement slot for ${tournamentId}, but no slots were available.`);
    }
  } else {
    console.log(`Tournament with ID ${tournamentId} not found for slot decrement.`);
  }
};
