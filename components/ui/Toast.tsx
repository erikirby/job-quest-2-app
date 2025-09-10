/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React from 'react';
import type { ToastMessage } from '../../types';

export const ToastContainer = ({ messages, onDismiss }: { messages: ToastMessage[], onDismiss: (id: number) => void }) => (
    <div className="fixed top-5 right-5 z-50">
        {messages.map(toast => (
            <div key={toast.id} className="bg-slate-800 text-white p-3 rounded-lg shadow-lg mb-2 animate-pulse">
                {toast.message}
            </div>
        ))}
    </div>
);
