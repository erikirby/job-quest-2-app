/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { Profile, GameState, Job } from './types';

export const INITIAL_PROFILES: Profile[] = [
    {
        id: 'erik',
        name: 'Erik',
        resume: 'erik-resume.pdf',
        preferences: {
            roles: ['Frontend Developer', 'React Developer', 'UI Engineer'],
            locations: ['Remote', 'New York, NY', 'San Francisco, CA'],
            remoteOnly: true,
        },
    }
];

export const INITIAL_GAME_STATE: GameState = {
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    lastCheckIn: null,
    applications: {},
    savedJobs: [],
    unlockedBadges: [],
    dailyMissions: {},
    lastMissionReset: null,
};

export const XP_VALUES = {
    SUBMIT: 10,
    REJECTED: 5,
    MISSION: 25,
    DAILY_CHECKIN: 15,
};

export const SUBMISSIONS_PER_LEVEL = 10;

export const BADGES = [
    { id: 'first-quest', name: 'First Quest', description: "Submit your first application.", criteria: (gs: GameState) => Object.keys(gs.applications).length >= 1 },
    { id: 'five-quests', name: 'Quest Novice', description: "Submit 5 applications.", criteria: (gs: GameState) => Object.keys(gs.applications).length >= 5 },
    { id: 'streak-starter', name: 'Streak Starter', description: "Achieve a 3-day check-in streak.", criteria: (gs: GameState) => gs.streak >= 3 },
    { id: 'level-5', name: 'Level 5', description: "Reach level 5.", criteria: (gs: GameState) => gs.level >= 5 },
];

// Helper for creating SVG icons
// FIX: Rewrote to use React.createElement to avoid JSX parsing issues.
const createIcon = (path: React.ReactElement): React.FC<{ className?: string }> => ({ className = 'w-6 h-6' }) => (
    React.createElement('svg', {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: 1.5,
        stroke: "currentColor",
        className: className
    }, path)
);

export const ICONS = {
    DASHBOARD: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" })),
    QUEST: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" })),
    QUEST_LOG: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" })),
    MISSIONS: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
    BADGES: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 18.75h-9a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25h9A2.25 2.25 0 0118.75 7.5v9a2.25 2.25 0 01-2.25 2.25z" })),
    SETTINGS: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9.594 3.94c.09-.542.56-1.007 1.11-1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226M9.594 18.06c.09.542.56 1.007 1.11 1.226.554-.22 1.196-.22 1.75 0 .548.22 1.018.684 1.11 1.226m-2.86 0A2.25 2.25 0 112.28 15.68a2.25 2.25 0 01-2.86 0zm14.53 0A2.25 2.25 0 1021.72 15.68a2.25 2.25 0 00-2.86 0zM12 21a9 9 0 100-18 9 9 0 000 18z" })),
    Flame: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.362-3.797z" })),
    CheckCircle: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" })),
    DocumentText: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m-1.5 0h-1.5A2.25 2.25 0 005.25 6v12A2.25 2.25 0 007.5 20.25h12A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.25M15 12l-3 3m0 0l-3-3m3 3V3" })),
    Trophy: createIcon(React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", d: "M16.5 18.75h-9a2.25 2.25 0 01-2.25-2.25v-9a2.25 2.25 0 012.25-2.25h9A2.25 2.25 0 0118.75 7.5v9a2.25 2.25 0 01-2.25 2.25zM16.5 18.75h-9" })),
};