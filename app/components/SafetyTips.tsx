'use client';

import React from 'react';

const safetyTips = [
    {
        id: 1,
        title: "Adult Supervision",
        description: "Children must always be supervised by adults while lighting any firework. This is the golden rule.",
        icon: "👨‍👩‍👧‍👦",
        color: "from-amber-100 to-emerald-100"
    },
    {
        id: 2,
        title: "Keep Distance",
        description: "Always maintain a safe distance of at least 5 meters. Never bend over a cracker while lighting it.",
        icon: "📏",
        color: "from-emerald-100 to-teal-100"
    },
    {
        id: 3,
        title: "Use Long Sticks",
        description: "Use a long sparkler or agarbatti to light crackers. Never use matchsticks or pocket lighters.",
        icon: "🕯️",
        color: "from-amber-100 to-orange-100"
    },
    {
        id: 4,
        title: "Open Spaces Only",
        description: "Strictly light fireworks in open grounds or terraces. Never light them inside the house or near vehicles.",
        icon: "🌳",
        color: "from-emerald-100 to-cyan-100"
    },
    {
        id: 5,
        title: "Wear Cotton",
        description: "Always wear thick cotton clothing. Synthetic fabrics catch fire easily and stick to the skin.",
        icon: "👕",
        color: "from-orange-100 to-amber-100"
    },
    {
        id: 6,
        title: "Water Bucket Handy",
        description: "Always keep a bucket of water or sand nearby to instantly extinguish accidental fires.",
        icon: "🪣",
        color: "from-teal-100 to-emerald-100"
    }
];

export default function SafetyTips() {
    return (
        <section id="safety-tips" className="bg-slate-50 py-24 md:py-36 scroll-mt-24 relative overflow-hidden">
            {/* Theme-aligned Ambient Glows (Light Theme) */}
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[150px] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-emerald-300/10 rounded-full blur-[150px] pointer-events-none"></div>

            {/* Sparkles Background */}
            <div className="absolute top-20 left-[10%] text-amber-500/40 text-3xl animate-[pulse_3s_infinite]">✨</div>
            <div className="absolute top-40 right-[20%] text-emerald-500/40 text-2xl animate-[pulse_2s_infinite]">✨</div>
            <div className="absolute bottom-40 left-[20%] text-amber-500/30 text-4xl animate-[pulse_4s_infinite]">✨</div>
            <div className="absolute bottom-20 right-[15%] text-emerald-500/30 text-xl animate-[pulse_2.5s_infinite]">✨</div>

            <div className="container mx-auto px-4 lg:px-8 relative z-10 max-w-7xl">
                {/* Header Section */}
                <div className="text-center mb-16 md:mb-28">
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white border border-emerald-200 text-emerald-600 font-black uppercase tracking-[0.3em] text-xs md:text-sm mb-6 shadow-sm">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                        Premium Safety Protocol
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-6 tracking-tighter drop-shadow-sm leading-[1.2]">
                        Celebrate With <br className="hidden md:block" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-amber-500 to-orange-500">Care & Joy</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto font-medium text-lg md:text-xl leading-relaxed">
                        A truly grand celebration is a safe one. Adhere to our guidelines to ensure your festival remains spectacular and joyful.
                    </p>
                </div>

                {/* The Staggered Grid (Light Theme) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12 pb-16 lg:pb-32">
                    {safetyTips.map((tip, index) => {
                        // Stagger the middle column
                        const isMiddleColumn = index % 3 === 1;

                        return (
                            <div 
                                key={tip.id}
                                className={`
                                    relative group rounded-[2rem] p-8 md:p-10 
                                    bg-white border border-slate-200 hover:border-emerald-300 
                                    shadow-[0_20px_50px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.15)]
                                    transition-all duration-500 hover:-translate-y-3 overflow-hidden
                                    ${isMiddleColumn ? 'lg:translate-y-16' : ''}
                                `}
                            >
                                {/* Theme Gradient Background Reveal */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${tip.color} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}></div>
                                
                                {/* Inner Emerald Glow line */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                <div className="relative z-10 flex flex-col items-center text-center">
                                    {/* Icon Container */}
                                    <div className="w-20 h-20 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-4xl mb-6 shadow-sm group-hover:scale-110 group-hover:border-emerald-200 group-hover:bg-white transition-all duration-500">
                                        {tip.icon}
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-wide group-hover:text-emerald-700 transition-colors duration-300">
                                        {tip.title}
                                    </h3>
                                    
                                    <p className="text-slate-600 font-medium leading-relaxed group-hover:text-slate-800 transition-colors duration-300">
                                        {tip.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Emergency Banner (Light Theme Version) */}
                <div className="mt-12 md:mt-24">
                    <div className="relative rounded-[2.5rem] bg-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl border border-red-100 group overflow-hidden">
                        {/* Soft Red Background */}
                        <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-orange-50 opacity-80"></div>

                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-500/5 to-transparent group-hover:animate-[shimmer_2.5s_infinite] skew-x-12"></div>

                        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10 text-center md:text-left w-full">
                            <div className="shrink-0 w-20 h-20 rounded-full bg-red-100 border-[2px] border-red-200 flex items-center justify-center text-4xl shadow-sm animate-pulse">
                                🚨
                            </div>
                            
                            <div>
                                <h4 className="text-2xl md:text-3xl font-black text-red-950 mb-2 uppercase tracking-widest">Emergency Protocol</h4>
                                <p className="text-red-900/80 text-base md:text-lg font-medium max-w-xl">
                                    In case of burns, wash immediately with cold water. For any serious injuries, immediately contact medical help.
                                </p>
                            </div>
                        </div>
                        
                        <a href="tel:108" className="w-full md:w-auto shrink-0 px-12 py-5 rounded-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-black text-xl uppercase tracking-[0.2em] transition-all shadow-[0_15px_30px_rgba(239,68,68,0.2)] text-center relative z-10 hover:scale-105">
                            Call 108
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
