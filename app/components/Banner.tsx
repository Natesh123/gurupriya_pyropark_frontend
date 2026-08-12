'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const defaultBannerImages = [
    '/assets/images/festive/banner_ai_new.png',
];

interface BannerProps {
    priceListUrl?: string;
}

export default function Banner({ priceListUrl = "" }: BannerProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [dynamicBanners, setDynamicBanners] = useState<string[]>([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
                const res = await fetch(`${apiUrl}/api/settings/banner-images/get`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.images && data.images.length > 0) {
                        const fixedImages = data.images.map((imgUrl: string) => {
                            if (imgUrl.includes('localhost:5000') || imgUrl.includes('localhost:5001')) {
                                try {
                                    const path = new URL(imgUrl).pathname;
                                    return `${apiUrl}${path}`;
                                } catch (e) {
                                    return imgUrl;
                                }
                            }
                            // Handle Mixed Content (http -> https) if the frontend is secure
                            if (typeof window !== 'undefined' && window.location.protocol === 'https:' && imgUrl.startsWith('http://')) {
                                return imgUrl.replace('http://', 'https://');
                            }
                            return imgUrl;
                        });
                        setDynamicBanners(fixedImages);
                    }
                }
            } catch (e) {
                console.error("Error fetching dynamic banners", e);
            }
        };
        fetchBanners();
    }, []);

    const imagesToUse = defaultBannerImages;
    const isDynamic = false;

    useEffect(() => {
        const slideInterval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % imagesToUse.length);
        }, 8000);
        return () => clearInterval(slideInterval);
    }, [imagesToUse.length]);

    return (
        <div className="relative w-full h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] overflow-hidden bg-black shadow-2xl">
            {/* Background Slides */}
            <div className="absolute inset-0 w-full h-full">
                {imagesToUse.map((src, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${currentSlide === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                            }`}
                    >
                        {/* Main Image (Fills container exactly, cropped nicely) */}
                        <img
                            src={src}
                            alt="Festive Banner"
                            className={`relative z-10 w-full h-full object-cover object-center transition-transform duration-[12000ms] ease-out ${currentSlide === index ? 'scale-[1.05]' : 'scale-100'}`}
                        />
                        <div className={`absolute inset-0 z-10 ${isDynamic ? 'bg-black/20' : 'bg-black/40'}`}></div>
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className={`absolute inset-0 z-20 flex ${isDynamic ? 'items-end pb-12 justify-center' : 'items-center'}`}>
                <div className={`container mx-auto px-4 lg:px-12 flex flex-col ${isDynamic ? 'justify-end items-center h-full' : 'justify-center items-center md:items-end text-center md:text-right h-full w-full'}`}>
                    
                    {!isDynamic && (
                        <div className="animate-slideDown max-w-3xl flex flex-col items-center md:items-end text-center md:text-right w-full mt-24 md:mt-32">
                             {/* Badge */}
                             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600 to-red-800 text-white mb-3 animate-sparkle shadow-[0_0_15px_rgba(220,38,38,0.6)] border border-red-500/50">
                                <span className="text-[10px] sm:text-xs md:text-sm font-black tracking-widest uppercase text-shadow-sm">அருங்குளம் ஸ்ரீ வீரம்மமாள் எல்லம்மாள் துணை</span>
                            </div>
    
                            <h2 className="text-gray-200 text-base md:text-lg font-bold mb-1 tracking-widest uppercase drop-shadow-sm">
                                Welcome To
                            </h2>
                            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2 md:mb-3 leading-[1.1] tracking-tighter drop-shadow-xl">
                                <span className="text-white">GURUPRIYA</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-festive-gold to-yellow-500">FIREWORKS</span> <span className="text-white">INDUSTRIES</span>
                            </h1>
                            <h2 className="text-lg sm:text-xl md:text-2xl font-black mb-4 md:mb-5 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] tracking-wide">
                                SIVAKASI.
                            </h2>
                            
                            <div className="bg-red-600 text-white font-black text-xl md:text-3xl px-5 py-2.5 rounded-xl transform md:-rotate-2 mb-4 shadow-xl border-2 border-yellow-400 inline-block animate-pulse">
                                UP TO 81% DISCOUNT
                            </div>

                            <p className="text-gray-100 text-xs sm:text-sm md:text-base mb-6 max-w-xl font-semibold drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] bg-black/40 p-3 sm:p-4 rounded-2xl border border-white/20 backdrop-blur-sm">
                                📍 Office: 3/1362/3, BharathiNagar 2,<br/>
                                Sattur Road, Sivakamipuram, SIVAKASI - 626189.
                            </p>
                        </div>
                    )}

                    <div className={`hidden md:flex flex-col sm:flex-row flex-wrap justify-center ${!isDynamic ? 'md:justify-end' : ''} gap-3 sm:gap-4 w-full sm:w-auto ${isDynamic ? 'animate-slideUp drop-shadow-xl' : ''}`}>
                        <button
                            onClick={() => {
                                if (priceListUrl) {
                                    window.open(priceListUrl, '_blank');
                                } else {
                                    const el = document.getElementById('pricelist');
                                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                                }
                            }}
                            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-festive-gold text-festive-green font-black text-sm sm:text-base uppercase tracking-wider hover:scale-105 transition-all shadow-[0_0_25px_rgba(255,215,0,0.4)] cursor-pointer"
                        >
                            View Price List
                        </button>
                        <button 
                            onClick={() => {
                                const el = document.getElementById('contact');
                                if (el) el.scrollIntoView({ behavior: 'smooth' });
                            }}
                            className={`w-full sm:w-auto px-8 py-3.5 rounded-full border-2 border-white text-white font-black text-sm sm:text-base uppercase tracking-wider transition-all cursor-pointer ${isDynamic ? 'bg-black/30 hover:bg-white hover:text-black backdrop-blur-sm' : 'hover:bg-white hover:text-festive-green'}`}
                        >
                            Contact Us
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
