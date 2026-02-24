export type TrainingLevel = 'puppy' | 'beginner' | 'intermediate' | 'advanced';

export interface Dog {
  id: string;
  ownerId: string;
  name: string;
  breed: string;
  ageMonths: number;
  weightLbs?: number;
  photoUrl?: string;
  trainingLevel: TrainingLevel;
  activeProgramId?: string;
  createdAt: string;
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  videoUrl?: string;
  reps?: number;
  sets?: number;
  holdSeconds?: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  tips: string[];
  imageUrl?: string;
}

export interface Session {
  id: string;
  programId: string;
  weekNumber: number;
  dayNumber: number;
  title: string;
  description: string;
  durationMinutes: number;
  exercises: Exercise[];
}

export interface ProgramWeek {
  weekNumber: number;
  title: string;
  description: string;
  sessions: Session[];
}

export interface Program {
  id: string;
  title: string;
  description: string;
  level: TrainingLevel;
  durationWeeks: number;
  sessionsPerWeek: number;
  thumbnailUrl?: string;
  tags: string[];
  weeks: ProgramWeek[];
  skillOutcomes: string[];
  emoji: string;
}

export interface ExerciseLog {
  id: string;
  sessionLogId: string;
  exerciseId: string;
  setsCompleted: number;
  repsCompleted: number;
  successRate: 1 | 2 | 3 | 4 | 5;
  notes: string;
  skipped: boolean;
  skipReason?: string;
}

export interface SessionLog {
  id: string;
  dogId: string;
  sessionId: string;
  programId: string;
  completedAt: string;
  durationMinutes: number;
  notes: string;
  exerciseLogs: ExerciseLog[];
}

export interface UserProgram {
  id: string;
  dogId: string;
  programId: string;
  startDate: string;
  currentWeek: number;
  currentDay: number;
  isActive: boolean;
  completedSessionIds: string[];
}

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  createdAt: string;
  notificationPreferences: {
    dailyReminderEnabled: boolean;
    dailyReminderTime: string; // HH:MM
    streakSaveEnabled: boolean;
  };
}

export interface ActiveSessionState {
  session: Session | null;
  currentExerciseIndex: number;
  exerciseLogs: Partial<ExerciseLog>[];
  startedAt: string | null;
  isComplete: boolean;
}
