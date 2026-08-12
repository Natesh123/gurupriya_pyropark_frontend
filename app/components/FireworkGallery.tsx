'use client';

import React from 'react';
import Image from 'next/image';

const galleryImages = [
    { id: 1, title: "Purple Rain", src: "/assets/images/gallery/firework_1.png", tag: "Sky Shot" },
    { id: 2, title: "Golden Willow", src: "/assets/images/gallery/firework_2.png", tag: "Classic" },
    { id: 3, title: "Emerald Burst", src: "/assets/images/gallery/firework_3.png", tag: "Premium" },
    { id: 4, title: "Grand Finale", src: "/assets/images/gallery/firework_4.png", tag: "Mega Show" }
];

export default function FireworkGallery() {
    return (
        <section className="bg-gradient-to-b from-white via-slate-50 to-white py-24 relative overflow-hidden">
            {/* Elegant Background Accents */}
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl opacity-60"></div>
            <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl opacity-60"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center mb-16 relative">
                    <span className="text-emerald-600 text-sm font-black tracking-[0.4em] uppercase mb-4 block drop-shadow-sm">Visual Experience</span>
                    <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 uppercase tracking-tighter">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 drop-shadow-sm">Art</span> of Fire
                    </h2>
                    <p className="text-slate-500 max-w-2xl mx-auto font-medium text-lg">
                        Witness the breathtaking beauty of our premium fireworks captured in high definition.
                    </p>
                </div>

                {/* Gallery Grid - Framed Art Style */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
                    {galleryImages.map((img) => (
                        <div 
                            key={img.id} 
                            className="group bg-white p-4 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_20px_40px_rgb(5,150,105,0.15)] border border-gray-100 transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col"
                        >
                            {/* Framed Image */}
                            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] mb-5 w-full bg-gray-100 border border-gray-50">
                                <Image 
                                    src={img.src} 
                                    alt={img.title} 
                                    fill 
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Subtle vignette */}
                                <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>

                            {/* Content Below Image */}
                            <div className="px-2 flex flex-col items-center text-center pb-2">
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 text-[10px] font-black uppercase tracking-widest mb-3">
                                    {img.tag}
                                </span>
                                <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight group-hover:text-emerald-600 transition-colors duration-300">
                                    {img.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Experience Banner */}
                <div className="mt-20 max-w-fit mx-auto p-[2px] bg-gradient-to-r from-emerald-200 via-amber-300 to-emerald-200 rounded-full shadow-lg">
                     <div className="bg-white py-4 px-8 md:px-12 text-center rounded-full">
                        <p className="text-slate-700 text-xs md:text-sm font-black uppercase tracking-[0.3em] md:tracking-[0.5em]">
                            Captured live at <span className="text-emerald-600">Sivakasi</span> manufacturing yards
                        </p>
                     </div>
                </div>
            </div>
        </section>
    );
}
