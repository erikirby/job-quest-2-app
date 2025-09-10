/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { GameState, Application, ApplicationStatus } from '../types';
import { SUBMISSIONS_PER_LEVEL, BADGES, ICONS } from '../constants';
import { isToday } from 'date-fns';

interface DashboardProps {
    gameState: GameState;
    onDailyCheckIn: () => void;
    onUpdateApplication: (jobId: string, updatedApp: Application) => void;
}

// FIX: Changed icon prop type to `React.ReactElement<{ className?: string }>` to fix cloneElement error.
const StatCard: React.FC<{
    title: string;
    value: string;
    icon: React.ReactElement<{ className?: string }>;
    gradient: string;
    delay: string;
}> = ({ title, value, icon, gradient, delay }) => (
    <div className={`opacity-0 animate-fade-in ${delay} p-4 rounded-2xl text-white shadow-lg flex justify-between items-center ${gradient}`}>
        <div>
            <p className="font-bold text-lg">{title}</p>
            <p className="text-sm">{value}</p>
        </div>
        {React.cloneElement(icon, { className: 'w-8 h-8 opacity-70'})}
    </div>
);

const Dashboard: React.FC<DashboardProps> = ({ gameState, onDailyCheckIn, onUpdateApplication }) => {
    const totalSubmissions = Object.keys(gameState.applications).length;
    const questsForNextLevel = (gameState.level * SUBMISSIONS_PER_LEVEL) - totalSubmissions;
    const progressToNextLevel = (totalSubmissions % SUBMISSIONS_PER_LEVEL);
    
    const hasCheckedInToday = gameState.lastCheckIn ? isToday(new Date(gameState.lastCheckIn)) : false;

    return (
        <div className="flex flex-col items-center gap-6">
            
            {/* Level Indicator */}
            <div className="opacity-0 animate-fade-in flex flex-col items-center justify-center w-40 h-40 bg-white/30 rounded-full shadow-lg backdrop-blur-sm">
                <p className="text-slate-600 text-lg font-medium">LV.</p>
                <p className="text-slate-800 text-6xl font-bold">{gameState.level}</p>
            </div>
            <p className="opacity-0 animate-fade-in animate-fade-in-delay-1 text-slate-600 font-semibold text-center -mt-2">
                {progressToNextLevel} / {SUBMISSIONS_PER_LEVEL} Quests
            </p>

            {/* Daily Check-in Button */}
            <button
                onClick={onDailyCheckIn}
                disabled={hasCheckedInToday}
                className={`opacity-0 animate-fade-in animate-fade-in-delay-2 w-full max-w-sm py-3 px-8 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300
                    ${hasCheckedInToday 
                        ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:shadow-xl'
                    }`}
            >
                {hasCheckedInToday ? "Checked-in for Today!" : "Daily Check-in (+5 XP)"}
            </button>

            {/* Stats Grid */}
            <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <StatCard 
                    title="Streak" 
                    value={`${gameState.streak} Days`} 
                    icon={<ICONS.Flame />} 
                    gradient="bg-gradient-to-br from-red-500 to-orange-400"
                    delay="animate-fade-in-delay-3"
                />
                <StatCard 
                    title="Badges" 
                    value={`${gameState.unlockedBadges.length} / ${BADGES.length} Unlocked`} 
                    icon={<ICONS.CheckCircle />} 
                    gradient="bg-gradient-to-br from-yellow-500 to-amber-400"
                    delay="animate-fade-in-delay-4"

                />
                <StatCard 
                    title="Total Quests" 
                    value={`${totalSubmissions} Submitted`} 
                    icon={<ICONS.DocumentText />} 
                    gradient="bg-gradient-to-br from-green-500 to-lime-400"
                    delay="animate-fade-in-delay-5"
                />
                <StatCard 
                    title="Best Streak" 
                    value={`${gameState.bestStreak} Days`} 
                    icon={<ICONS.Trophy />} 
                    gradient="bg-gradient-to-br from-cyan-500 to-sky-400"
                    delay="animate-fade-in-delay-6"
                />
            </div>

            {/* Application Status */}
            <div className="opacity-0 animate-fade-in animate-fade-in-delay-6 w-full max-w-3xl p-6 bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg mt-4">
                <h2 className="text-slate-700 font-bold text-xl">Application Status</h2>
                <p className="text-slate-500 mt-2">
                    {totalSubmissions > 0 
                        ? "Here's a summary of your recent applications." 
                        : "Submit your first quest to see its status here!"}
                </p>
                {/* Application status content will go here */}
            </div>

        </div>
    );
};

export default Dashboard;