"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useCart } from "../context/CartContext";

interface NavbarProps {
    priceListUrl?: string;
}

export default function Navbar({ priceListUrl = "" }: NavbarProps) {
    const { cartCount, setCartOpen } = useCart();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [daysLeft, setDaysLeft] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        // Simple Diwali Countdown (Mockup for Nov 1st)
        const diwaliDate = new Date("2026-11-01").getTime();
        const now = new Date().getTime();
        const diff = diwaliDate - now;
        setDaysLeft(Math.floor(diff / (1000 * 60 * 60 * 24)));

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full max-w-[100vw] z-50 flex flex-col">
            {/* Top Bar */}
            <div className={`w-full bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase relative overflow-hidden transition-all duration-500 shadow-md border-b border-red-700/50 ${scrolled ? 'h-0 py-0 opacity-0' : 'py-2.5 opacity-100'}`}>
                <div className="animate-marquee whitespace-nowrap flex items-center">
                    <span>Diwali sale is open now. Please buy early to get best discounts.</span>
                    {daysLeft > 0 ? <span className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)] font-semibold mx-2 tracking-wider">★ ONLY {daysLeft} DAYS LEFT FOR DIWALI! ★</span> : <span className="text-yellow-300 font-semibold mx-2">HAPPY DIWALI!</span>} 
                    <span className="font-semibold text-yellow-300 mr-8">+91 63826 50924</span>

                    <span>Diwali sale is open now. Please buy early to get best discounts.</span>
                    {daysLeft > 0 ? <span className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)] font-semibold mx-2 tracking-wider">★ ONLY {daysLeft} DAYS LEFT FOR DIWALI! ★</span> : <span className="text-yellow-300 font-semibold mx-2">HAPPY DIWALI!</span>} 
                    <span className="font-semibold text-yellow-300 mr-8">+91 63826 50924</span>
                    
                    <span>Diwali sale is open now. Please buy early to get best discounts.</span>
                    {daysLeft > 0 ? <span className="text-yellow-300 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)] font-semibold mx-2 tracking-wider">★ ONLY {daysLeft} DAYS LEFT FOR DIWALI! ★</span> : <span className="text-yellow-300 font-semibold mx-2">HAPPY DIWALI!</span>} 
                    <span className="font-semibold text-yellow-300">+91 63826 50924</span>
                </div>
            </div>

            <nav
                className={`w-full transition-all duration-500 relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-emerald-900 border-b border-emerald-700/50 backdrop-blur-xl shadow-[0_10px_30px_rgba(4,120,87,0.3)] ${scrolled ? "py-1.5" : "py-2 md:py-3"}`}
            >
                {/* Ultra-premium glowing bottom border */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-festive-gold/60 to-transparent shadow-[0_0_15px_rgba(255,215,0,0.3)]"></div>
                
                <div className="w-full max-w-[1920px] mx-auto flex items-center justify-between px-3 sm:px-4 lg:px-6 xl:px-8 2xl:px-12 relative z-10">
                    {/* Logo Section */}
                    <div className="flex items-center gap-2 sm:gap-3 lg:gap-4 group cursor-pointer shrink-0">
                        <div className="relative w-[48px] h-[34px] sm:w-[58px] sm:h-[40px] lg:w-[70px] lg:h-[48px] xl:w-[78px] xl:h-[54px] shrink-0 rounded-lg overflow-hidden bg-white shadow-[0_2px_10px_rgba(0,0,0,0.1)] border-[2px] border-white/90 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:shadow-[0_8px_20px_rgba(16,185,129,0.3)] flex items-center justify-center p-1">
                            <div className="relative w-full h-full rounded-sm overflow-hidden bg-white shadow-inner">
                                <Image 
                                    src="/assets/images/gurupriya_pyropark_logo_primary.png" 
                                    alt="Logo" 
                                    fill 
                                    className="object-contain object-center"
                                />
                            </div>
                        </div>
                            <div className="flex flex-col -gap-1 xl:gap-0 mt-0.5 xl:mt-1">
                                <h1 className="font-semibold text-[13px] sm:text-[15px] lg:text-[17px] xl:text-[22px] tracking-tighter xl:tracking-tight leading-none xl:leading-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                                    GURUPRIYA <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500">PYRO PARK</span>
                            </h1>
                            <p className="hidden sm:block text-[8px] lg:text-[9px] xl:text-[11px] font-bold text-amber-200/90 tracking-wider uppercase mt-1 drop-shadow-sm">
                                Premium Sivakasi Fireworks
                            </p>
                        </div>
                    </div>

                    {/* Center: Desktop Menu */}
                    <ul className="hidden lg:flex items-center lg:gap-3 xl:gap-5 2xl:gap-8 shrink-1">
                        {[
                            { name: "Home", link: "/" },
                            { name: "Products", link: "/products" },
                            { name: "Safety Tips", link: "/#safety-tips" },
                            { name: "About Us", link: "/#about-us" },
                            { name: "Contact", link: "/#contact" }
                        ].map((item) => (
                            <li key={item.name} className="relative group flex flex-col items-center">
                                <a
                                    href={item.name === "Pricelist" && priceListUrl ? priceListUrl : item.link}
                                    target={item.name === "Pricelist" && priceListUrl ? "_blank" : undefined}
                                    rel={item.name === "Pricelist" && priceListUrl ? "noreferrer" : undefined}
                                    className="whitespace-nowrap text-[11px] xl:text-[13px] 2xl:text-[15px] font-semibold uppercase tracking-[0.05em] lg:tracking-wide transition-all duration-300 text-white hover:text-festive-gold drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] hover:drop-shadow-[0_0_12px_rgba(255,215,0,0.6)]"
                                >
                                    {item.name}
                                </a>
                                {/* Premium glowing dot on hover instead of line */}
                                <span className="absolute -bottom-3 w-1.5 h-1.5 rounded-full bg-festive-gold opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 shadow-[0_0_12px_rgba(255,215,0,1)]"></span>
                            </li>
                        ))}
                    </ul>

                    {/* Right: Actions */}
                    <div className="hidden lg:flex items-center gap-2 xl:gap-3 2xl:gap-6 shrink-0">
                        {/* Premium Cart Button */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="whitespace-nowrap relative flex items-center gap-1.5 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 transition-all duration-300 shadow-lg hover:shadow-xl group cursor-pointer hover:-translate-y-0.5"
                        >
                            <span className="group-hover:scale-110 transition-transform duration-300 drop-shadow-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 xl:w-5 xl:h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </span>
                            <span className="font-semibold text-[10px] xl:text-xs uppercase tracking-wider text-white drop-shadow-sm">Cart</span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-yellow-400 text-slate-900 text-[9px] xl:text-[10px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-orange-500 animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Sleek Contact Box with 2 Numbers - Hidden on lg, xl to save space, visible on 2xl+ */}
                        <div className="hidden 2xl:flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-festive-gold/30 transition-all duration-300 shadow-inner group">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-festive-gold/30 to-festive-gold/10 flex items-center justify-center text-festive-gold group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,215,0,0.2)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="flex flex-col">
                                <span className="whitespace-nowrap text-[9px] font-bold uppercase text-yellow-400 tracking-wider mb-0.5 drop-shadow-sm">Enquiry & Bulk</span>
                                <span className="whitespace-nowrap text-[11px] font-semibold leading-tight text-white tracking-wider drop-shadow-md">+91 63826 50924</span>

                            </div>
                        </div>

                        {/* Ultra Premium Price List Button */}
                        <a 
                            href={priceListUrl || "#"}
                            target={priceListUrl ? "_blank" : undefined}
                            rel={priceListUrl ? "noreferrer" : undefined}
                            className="whitespace-nowrap relative group px-4 py-2 xl:px-5 xl:py-2.5 rounded-full font-semibold text-[10px] xl:text-xs uppercase tracking-wider text-emerald-700 bg-white hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-1.5 hover:-translate-y-0.5"
                        >
                            <span className="relative z-10 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 xl:w-5 xl:h-5 text-emerald-600 group-hover:-translate-y-1 transition-transform duration-300"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>
                                Price List
                            </span>
                        </a>
                    </div>

                    {/* Right Actions (Mobile) */}
                    <div className="flex items-center gap-4 lg:hidden">
                        {/* Mobile Cart Button */}
                        <button
                            onClick={() => setCartOpen(true)}
                            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-orange-500 to-amber-600 shadow-lg text-white hover:scale-105 transition-transform"
                        >
                            <span className="drop-shadow-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-white">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                            </span>
                            {cartCount > 0 && (
                                <span className="absolute -top-1 -right-1 bg-yellow-400 border-2 border-orange-500 text-slate-900 text-[9px] font-semibold w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-bounce">
                                    {cartCount}
                                </span>
                            )}
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="w-10 h-10 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white transition-colors"
                        >
                            <span className="text-lg">{isOpen ? "✕" : "☰"}</span>
                        </button>
                    </div>
                </div>

            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-emerald-950/95 backdrop-blur-xl z-40 lg:hidden transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
            >
                {/* Close Button Inside Overlay */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 w-12 h-12 rounded-full border border-white/20 bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors z-50"
                    aria-label="Close menu"
                >
                    <span className="text-xl">✕</span>
                </button>
                <div className={`flex flex-col h-full items-center justify-center gap-8 pt-24 pb-10 overflow-y-auto transition-transform duration-700 ${isOpen ? "translate-y-0" : "translate-y-10"}`}>
                    {[
                        { name: "Home", link: "/" },
                        { name: "Products", link: "/products" },
                        { name: "Safety Tips", link: "/#safety-tips" },
                        { name: "About Us", link: "/#about-us" },
                        { name: "Contact", link: "/#contact" }
                    ].map((item) => (
                        <a
                            key={item.name}
                            href={item.name === "Pricelist" && priceListUrl ? priceListUrl : item.link}
                            target={item.name === "Pricelist" && priceListUrl ? "_blank" : undefined}
                            rel={item.name === "Pricelist" && priceListUrl ? "noreferrer" : undefined}
                            onClick={() => setIsOpen(false)}
                            className="text-xl sm:text-xl font-semibold text-white/80 uppercase tracking-wider hover:text-festive-gold hover:scale-110 transition-all duration-300"
                        >
                            {item.name}
                        </a>
                    ))}
                    <div className="mt-12 flex flex-col items-center gap-6 text-center w-full max-w-xs">
                         <div className="flex flex-col items-center gap-1 bg-emerald-900/50 border border-emerald-500/30 p-5 rounded-3xl w-full">
                             <span className="text-emerald-300 font-bold uppercase tracking-wider text-xs mb-2">Direct Support</span>
                             <span className="text-white font-semibold text-xl tracking-wide">+91 63826 50924</span>

                         </div>
                         <a 
                            href={priceListUrl || "#"}
                            target={priceListUrl ? "_blank" : undefined}
                            rel={priceListUrl ? "noreferrer" : undefined}
                            onClick={() => setIsOpen(false)}
                            className="w-full py-4 rounded-full font-semibold text-sm uppercase tracking-wider bg-gradient-to-r from-festive-gold to-yellow-400 text-festive-green flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,215,0,0.3)] hover:scale-105 transition-transform duration-300"
                         >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v11.69l3.22-3.22a.75.75 0 111.06 1.06l-4.5 4.5a.75.75 0 01-1.06 0l-4.5-4.5a.75.75 0 111.06-1.06l3.22 3.22V3a.75.75 0 01.75-.75zm-9 13.5a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" /></svg>
                            Download Price List
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
