import { Injectable } from '@nestjs/common';

@Injectable()
export class CertificationsService {
  findAll() {
    return {
      certifications: [
        {
          code: 'SEC0',
          name: 'Foundational Security',
          level: 'beginner',
          description: 'Validates foundational IT literacy.',
          requiredPath: 'pre-security',
          examDuration: 120,
          format: 'practical',
        },
        {
          code: 'SEC1',
          name: 'Cyber Security 101',
          level: 'beginner',
          description: 'Core cyber security fundamentals.',
          requiredPath: 'cyber-security-101',
          examDuration: 1440,
          format: 'practical',
        },
        {
          code: 'SAL1',
          name: 'Security Analyst Level 1',
          level: 'entry',
          description: 'SOC operations and alert triage.',
          requiredPath: 'soc-level-1',
          examDuration: 480,
          format: 'soc_simulator',
          backedBy: ['Accenture', 'Salesforce'],
        },
        {
          code: 'PT1',
          name: 'Junior Penetration Tester',
          level: 'entry',
          description: 'Full penetration test lifecycle.',
          requiredPath: 'jr-penetration-tester',
          examDuration: 1440,
          format: 'pentest_simulator',
        },
        {
          code: 'AI1',
          name: 'AI Security Level 1',
          level: 'intermediate',
          description: 'AI system vulnerability exploitation.',
          requiredPath: 'ai-security',
          examDuration: 480,
          format: 'practical',
        },
      ],
    };
  }

  findByCode(code: string) {
    return {
      code,
      name: 'Security Analyst Level 1',
      level: 'entry',
      description: 'Real-world SOC operations.',
      examDuration: 480,
      format: 'soc_simulator',
      prerequisites: ['soc-level-1'],
      passingScore: 70,
    };
  }

  startExam(code: string, userId: string) {
    return {
      attemptId: 'attempt-' + Math.random().toString(36).substring(7),
      startedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString(),
      examUrl: '/exam/' + code.toLowerCase(),
    };
  }

  getUserCertifications(userId: string) {
    return {
      earned: [
        {
          code: 'SEC0',
          name: 'Foundational Security',
          issuedAt: '2026-03-15T00:00:00Z',
          score: 92,
          verificationUrl: '/certifications/verify/cert-abc123',
        },
      ],
      inProgress: [
        {
          code: 'SEC1',
          name: 'Cyber Security 101',
          progress: 75,
        },
      ],
    };
  }

  verify(certId: string) {
    return {
      valid: true,
      holder: 'CyberHacker',
      certification: 'SEC0 - Foundational Security',
      issuedAt: '2026-03-15T00:00:00Z',
      score: 92,
    };
  }
}
