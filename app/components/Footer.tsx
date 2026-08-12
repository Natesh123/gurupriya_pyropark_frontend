'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const quickLinks = [
        { name: 'Home', href: '/', isLink: true },
        { name: 'Products', href: '/products', isLink: true },
        { name: 'Safety Tips', href: '/#safety-tips', isLink: false },
        { name: 'About Us', href: '/#about-us', isLink: false },
        { name: 'Contact Us', href: '/#contact', isLink: false },
    ];

    const socialLinks = [
        {
            title: 'YouTube',
            href: 'https://www.youtube.com/shorts/tpABtNPidAU',
            icon: <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />,
            hoverClass: 'hover:bg-red-500 hover:text-white hover:border-red-500'
        },
        {
            title: 'Instagram',
            href: 'https://www.instagram.com/gurupriya_pyropark/',
            icon: <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />,
            hoverClass: 'hover:bg-gradient-to-tr hover:from-orange-500 hover:via-pink-500 hover:to-purple-500 hover:text-white hover:border-pink-500'
        },
        {
            title: 'Facebook',
            href: 'https://www.facebook.com/share/19fvU2TpPK/',
            icon: <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />,
            hoverClass: 'hover:bg-blue-600 hover:text-white hover:border-blue-600'
        },
        {
            title: 'WhatsApp',
            href: 'https://wa.me/916382650924',
            icon: <path d="M11.99 2.01c-5.52 0-9.99 4.47-9.99 9.99 0 1.98.58 3.82 1.58 5.37l-1.57 4.6 4.77-1.22c1.51.91 3.28 1.44 5.17 1.44 5.52 0 9.99-4.47 9.99-9.99s-4.47-9.99-9.99-9.99zm0 18.27c-1.63 0-3.17-.42-4.51-1.16l-.32-.18-3.04.78 1.01-2.92-.2-.33c-.78-1.29-1.24-2.82-1.24-4.45 0-4.58 3.73-8.31 8.31-8.31s8.31 3.73 8.31 8.31-3.73 8.31-8.31 8.31zm4.56-6.19c-.25-.13-1.48-.73-1.71-.81-.23-.08-.4-.13-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.55.06-1.5-.78-2.67-1.5-3.69-2.93-.11-.16.02-.24.14-.36.11-.11.25-.29.37-.44.08-.1.13-.17.21-.33.1-.21.05-.39-.02-.52-.16-.27-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44H7.2c-.2 0-.52.08-.79.37s-1.04 1.02-1.04 2.48 1.07 2.89 1.22 3.09c.15.2 2.1 3.2 5.09 4.49 2.21.96 2.92 1.04 3.96.88.94-.15 2.53-1.04 2.89-2.04.36-1.01.36-1.87.25-2.04-.11-.18-.4-.28-.65-.4z" />,
            hoverClass: 'hover:bg-[#25D366] hover:text-white hover:border-[#25D366]'
        }
    ];

    return (
        <footer id="premium-footer" className="relative bg-emerald-950 text-emerald-50 border-t border-emerald-900 overflow-hidden pt-20 pb-8">
            
            {/* Subtle Ambient Glows for luxury feel */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none"></div>

            <div className="container mx-auto px-6 xl:px-0 max-w-7xl relative z-10">
                
                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* Main 4-Column Grid */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
                    
                    {/* Column 1: Brand & About */}
                    <div className="flex flex-col">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 rounded-2xl bg-white p-2 shadow-lg flex-shrink-0 border border-emerald-100">
                                <Image
                                    src="/assets/images/gurupriya_pyropark_logo_primary.png"
                                    alt="Gurupriya Pyro Park Logo"
                                    width={64}
                                    height={64}
                                    className="object-contain w-full h-full"
                                />
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold tracking-tight text-white leading-none mb-1">
                                    GURUPRIYA <br/><span className="text-amber-400">PYRO PARK</span>
                                </h2>
                                <span className="text-[10px] text-emerald-300 font-bold tracking-wider uppercase">
                                    Sivakasi
                                </span>
                            </div>
                        </div>
                        <p className="text-emerald-200/80 text-sm leading-relaxed font-medium mb-6">
                            Bringing the magic of fireworks directly from the heart of Sivakasi to your doorstep. Premium quality, unbeatable prices, and the highest safety standards.
                        </p>
                        <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-emerald-900 border border-emerald-800 rounded-full text-[10px] font-bold text-amber-400 uppercase tracking-wider shadow-inner">
                                Factory Direct
                            </span>
                            <span className="px-3 py-1 bg-emerald-900 border border-emerald-800 rounded-full text-[10px] font-bold text-emerald-300 uppercase tracking-wider shadow-inner">
                                Certified
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="flex flex-col lg:pl-8">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            Quick Links
                        </h3>
                        <ul className="flex flex-col gap-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    {link.isLink ? (
                                        <Link href={link.href} className="text-emerald-200/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                                            <span className="w-0 h-[1px] bg-amber-400 group-hover:w-3 transition-all duration-300"></span>
                                            {link.name}
                                        </Link>
                                    ) : (
                                        <a href={link.href} className="text-emerald-200/80 hover:text-white transition-colors text-sm font-medium flex items-center gap-2 group">
                                            <span className="w-0 h-[1px] bg-amber-400 group-hover:w-3 transition-all duration-300"></span>
                                            {link.name}
                                        </a>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            Contact Us
                        </h3>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-amber-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold mb-0.5">Phone</span>
                                    <a href="tel:+916382650924" className="text-sm font-medium text-emerald-50 hover:text-white transition-colors">+91 63826 50924</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-amber-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold mb-0.5">Email</span>
                                    <a href="mailto:moorthyguru1995@gmail.com" className="text-sm font-medium text-emerald-50 hover:text-white transition-colors">moorthyguru1995@gmail.com</a>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <div className="mt-0.5 text-amber-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                </div>
                                <div>
                                    <span className="block text-[10px] text-emerald-400/80 uppercase tracking-wider font-bold mb-0.5">Showroom</span>
                                    <p className="text-sm font-medium text-emerald-50 leading-relaxed">
                                        BHARATHINAGAR, 2nd St,<br/>
                                        Viswanatham,<br/>
                                        Tamil Nadu 626189
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Column 4: Timings & Socials */}
                    <div className="flex flex-col">
                        <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-6 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                            Timings & Socials
                        </h3>
                        
                        <div className="bg-emerald-900/50 border border-emerald-800/50 rounded-2xl p-4 mb-6">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                </span>
                                <span className="text-[10px] font-bold text-green-400 uppercase tracking-wider">Season Open</span>
                            </div>
                            <p className="text-sm font-medium text-white">Mon - Sun: 9:00 AM – 10:00 PM</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.title}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.title}
                                    className={`w-10 h-10 rounded-full bg-emerald-900 border border-emerald-800 text-emerald-400 flex items-center justify-center transition-all duration-300 hover:-translate-y-1 ${social.hoverClass}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        {social.icon}
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                </div>

                {/* ═══════════════════════════════════════════════════════════════ */}
                {/* Bottom Copyright Bar */}
                {/* ═══════════════════════════════════════════════════════════════ */}
                <div className="relative pt-6 border-t border-emerald-900/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-emerald-100/80 text-xs font-medium tracking-wide">
                            &copy; {new Date().getFullYear()} Gurupriya Pyro Park. All rights reserved.
                        </p>
                        <p className="text-emerald-100/80 text-xs font-medium tracking-wide flex items-center gap-1.5">
                            Powered By <span className="text-amber-400 font-bold drop-shadow-sm">Dhakshina Tech Solutions</span>
                        </p>
                    </div>
                </div>

            </div>

            {/* Scroll to Top Button */}
            <button
                onClick={scrollToTop}
                className="hidden sm:flex absolute bottom-8 right-8 w-10 h-10 bg-emerald-800 border border-emerald-700 text-amber-400 rounded-full items-center justify-center shadow-lg hover:bg-emerald-700 hover:-translate-y-1 transition-all duration-300 z-20"
                title="Scroll to Top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                </svg>
            </button>
        </footer>
    );
}
