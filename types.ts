/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
export enum Tab {
    Dashboard = 'Dashboard',
    QuestBoard = 'Quest Board',
    QuestLog = 'Quest Log',
    DailyMissions = 'Daily Missions',
    BadgeGallery = 'Badge Gallery',
    Settings = 'Settings',
}

export type ApplicationStatus = 'Submitted' | 'Viewed' | 'Interviewing' | 'Offer' | 'Rejected';

export interface FollowUp {
    id: string;
    dueDate: string;
    completed: boolean;
}

export interface Application {
    jobId: string;
    jobTitle: string;
    company: string;
    status: ApplicationStatus;
    submittedAt: string;
    followUps: FollowUp[];
}

export interface GameState {
    xp: number;
    level: number;
    streak: number;
    bestStreak: number;
    lastCheckIn: string | null;
    applications: Record<string, Application>;
    savedJobs: string[];
    unlockedBadges: string[];
    dailyMissions: Record<string, boolean>;
    lastMissionReset: string | null;
}

export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    url: string;
    tags: string[];
    description: string;
    remote: boolean;
    rarity: number;
    emoji?: string;
    type?: string;
    source?: string;
}

export interface Profile {
    id: string;
    name: string;
    resume: string;
    preferences: {
        roles: string[];
        locations: string[];
        remoteOnly: boolean;
    };
}

export interface ToastMessage {
    id: number;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
}
