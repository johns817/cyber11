import { Injectable } from '@nestjs/common';

@Injectable()
export class RoomsService {
  findAll(filters: { type?: string; difficulty?: string; search?: string; page?: number; limit?: number }) {
    return {
      rooms: [
        {
          id: '1',
          slug: 'linux-fundamentals-1',
          title: 'Linux Fundamentals Part 1',
          type: 'walkthrough',
          difficulty: 'very_easy',
          tasks: 8,
          users: 245000,
          duration: 60,
          tags: ['Linux', 'Fundamentals'],
        },
        {
          id: '2',
          slug: 'active-directory-basics',
          title: 'Active Directory Basics',
          type: 'walkthrough',
          difficulty: 'medium',
          tasks: 10,
          users: 56000,
          duration: 180,
          tags: ['Active Directory', 'Windows'],
        },
      ],
      total: 900,
      page: filters.page || 1,
      limit: filters.limit || 20,
    };
  }

  findBySlug(slug: string) {
    return {
      id: '1',
      slug,
      title: 'Active Directory Basics',
      description: 'Introduction to Active Directory concepts, enumeration techniques, and basic attack vectors.',
      type: 'walkthrough',
      difficulty: 'medium',
      duration: 180,
      author: 'CyberQuest Team',
      users: 56000,
      xpReward: 100,
      tags: ['Active Directory', 'Windows'],
      prerequisites: [],
    };
  }

  getTasks(slug: string) {
    return {
      tasks: [
        {
          id: '1',
          title: 'Introduction to Active Directory',
          order: 1,
          type: 'question',
          questions: [
            { id: 'q1', text: 'What service does Windows Server use to manage domain resources?', points: 5 },
            { id: 'q2', text: 'What protocol does AD use for authentication by default?', points: 5 },
          ],
          hints: [
            { id: 'h1', order: 1, xpPenalty: 5 },
          ],
        },
      ],
    };
  }

  deployMachine(slug: string, userId: string) {
    return {
      instanceId: 'inst-' + Math.random().toString(36).substring(7),
      ipAddress: '10.10.' + Math.floor(Math.random() * 255) + '.' + Math.floor(Math.random() * 255),
      status: 'starting',
      expiresAt: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    };
  }

  submitAnswer(slug: string, taskId: string, answer: string, userId: string) {
    return {
      correct: true,
      xpEarned: 10,
      message: 'Correct answer!',
    };
  }

  unlockHint(slug: string, hintId: string, userId: string) {
    return {
      hintText: 'Try looking at the services running on the machine. What common Windows service manages domain resources?',
      xpDeducted: 5,
    };
  }

  getProgress(slug: string, userId: string) {
    return {
      percentage: 25,
      completedTasks: ['1'],
      answeredQuestions: ['q1', 'q2'],
      startedAt: new Date().toISOString(),
    };
  }
}
