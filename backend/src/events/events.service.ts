import { Injectable } from '@nestjs/common';

@Injectable()
export class EventsService {
  findAll(filters: { type?: string; status?: string }) {
    return {
      events: [
        {
          id: '1',
          title: 'Summer CTF 2026',
          type: 'ctf',
          status: 'upcoming',
          startDate: '2026-07-15T00:00:00Z',
          endDate: '2026-07-17T23:59:59Z',
          participants: 2340,
          maxParticipants: 5000,
        },
        {
          id: '2',
          title: 'Red vs Blue Battle',
          type: 'team_battle',
          status: 'upcoming',
          startDate: '2026-07-22T00:00:00Z',
          endDate: '2026-07-22T23:59:59Z',
          participants: 890,
          maxParticipants: 2000,
        },
      ],
    };
  }

  findById(id: string) {
    return {
      id,
      title: 'Summer CTF 2026',
      description: 'Annual capture the flag competition with prizes.',
      type: 'ctf',
      status: 'upcoming',
      startDate: '2026-07-15T00:00:00Z',
      endDate: '2026-07-17T23:59:59Z',
      participants: 2340,
      maxParticipants: 5000,
      rules: 'No flag sharing. No brute-forcing the scoring server.',
    };
  }

  register(eventId: string, userId: string, teamId?: string) {
    return { success: true, message: 'Successfully registered for the event.' };
  }

  getLeaderboard(eventId: string) {
    return {
      leaderboard: [
        { rank: 1, username: 'z3r0day', score: 4500, solves: 15 },
        { rank: 2, username: 'sh4d0w', score: 4200, solves: 14 },
        { rank: 3, username: 'r00tk1t', score: 3800, solves: 13 },
      ],
    };
  }

  getActiveKothGames() {
    return {
      games: [
        {
          id: '1',
          name: 'Fortress Siege',
          players: 12,
          maxPlayers: 16,
          difficulty: 'medium',
          status: 'active',
          currentKing: 'sh4d0w',
        },
      ],
    };
  }

  joinKoth(gameId: string, userId: string) {
    return { success: true, message: 'Joined the game. Hack the machine to become king!' };
  }
}
