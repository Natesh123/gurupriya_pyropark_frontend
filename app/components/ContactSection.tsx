'use client';

import React, { useState, useEffect } from 'react';

export default function ContactSection() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        if (toast) {
            const timer = setTimeout(() => setToast(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [toast]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim() || !phone.trim() || !message.trim()) {
            setToast({ message: 'All fields are required', type: 'error' });
            return;
        }

        const digitsOnly = phone.replace(/\D/g, '');
        if (digitsOnly.length < 10) {
            setToast({ message: 'Please enter a valid 10-digit phone number', type: 'error' });
            return;
        }

        setSubmitting(true);
        setToast(null);

        try {
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';
            const res = await fetch(`${apiUrl}/api/contacts`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, phone, message }),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to send message');

            setToast({ message: 'Message sent successfully! We will contact you soon.', type: 'success' });
            setName('');
            setPhone('');
            setMessage('');
        } catch (err: any) {
            setToast({ message: err.message || 'Failed to send message. Please try again.', type: 'error' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section id="contact" className="w-full pt-8 pb-20 md:pt-12 md:pb-32 bg-slate-50 scroll-mt-24">
            
            <div className="container mx-auto px-4 xl:px-0 max-w-6xl">
                
                {/* Header Title (Above the split screen) */}
                <div className="text-center mb-12">
                    <h2 className="text-xl md:text-xl font-semibold text-slate-900 tracking-tight mb-4">
                        Get in <span className="text-emerald-600">Touch</span>
                    </h2>
                    <p className="text-slate-500 font-medium text-sm md:text-base max-w-2xl mx-auto">
                        Have questions about our premium fireworks or bulk orders? We're here to help you celebrate with joy.
                    </p>
                </div>

                {/* The Majestic Split-Screen Container */}
                <div className="flex flex-col lg:flex-row w-full bg-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100">
                    
                    {/* LEFT PANEL: The Emerald Dashboard */}
                    <div className="w-full lg:w-5/12 bg-emerald-900 p-10 md:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden">
                        
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

                        <div className="relative z-10 flex flex-col h-full">
                            
                            {/* Top: Header & Profile */}
                            <div className="mb-12">
                                <h3 className="text-xl md:text-xl font-bold text-white tracking-tight mb-8">Contact Information</h3>
                                
                                <div className="flex items-center gap-4 bg-emerald-800/50 p-4 rounded-2xl border border-emerald-700/50 backdrop-blur-sm">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white font-semibold text-xl shadow-inner shrink-0">
                                        G
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block mb-0.5">Proprietor</span>
                                        <p className="text-lg font-semibold text-white leading-none">G.Mookaiya</p>
                                    </div>
                                    <div className="ml-auto hidden sm:flex items-center gap-1.5 bg-emerald-900/50 px-3 py-1.5 rounded-full border border-emerald-700/50">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                        <span className="text-[9px] font-bold text-emerald-200 uppercase tracking-wider">Online</span>
                                    </div>
                                </div>
                            </div>

                            {/* Middle: Details List */}
                            <div className="flex flex-col gap-8 flex-grow">
                                
                                {/* Phone Section */}
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-emerald-700 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Direct Line</span>
                                        <a href="tel:+916382650924" className="text-xl md:text-xl font-semibold text-white hover:text-amber-400 transition-colors tracking-tight">
                                            +91 63826 50924
                                        </a>
                                    </div>
                                </div>

                                {/* Email Section */}
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-emerald-700 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" /><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" /></svg>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">Email Address</span>
                                        <a href="mailto:moorthyguru1995@gmail.com" className="text-sm md:text-base font-medium text-emerald-50 hover:text-white transition-colors">
                                            moorthyguru1995@gmail.com
                                        </a>
                                    </div>
                                </div>

                                {/* Address Section */}
                                <div className="flex items-start gap-4 group">
                                    <div className="w-10 h-10 rounded-full bg-emerald-800/50 flex items-center justify-center text-emerald-300 shrink-0 group-hover:bg-emerald-700 transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" /></svg>
                                    </div>
                                    <div>
                                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block mb-1.5">Official Showroom</span>
                                        <p className="text-base font-medium text-emerald-50 leading-relaxed">
                                        BHARATHINAGAR, 2nd St,<br/>
                                        Viswanatham<br/>
                                        <span className="text-emerald-200">Tamil Nadu, 626189</span>
                                    </p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: The Pure Form */}
                    <div className="w-full lg:w-7/12 bg-white p-10 md:p-12 lg:p-14 flex flex-col justify-center">
                        <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-xl mx-auto">
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div className="group relative">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Full Name</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={e => setName(e.target.value)} 
                                        required 
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                                        placeholder="John Doe" 
                                    />
                                </div>

                                <div className="group relative">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Phone Number</label>
                                    <input 
                                        type="tel" 
                                        value={phone} 
                                        onChange={e => setPhone(e.target.value)} 
                                        required 
                                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-sm" 
                                        placeholder="+91 00000 00000" 
                                    />
                                </div>
                            </div>

                            <div className="group relative mt-2">
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 ml-1">Message</label>
                                <textarea 
                                    rows={4} 
                                    value={message} 
                                    onChange={e => setMessage(e.target.value)} 
                                    required 
                                    className="w-full min-h-[120px] bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl px-5 py-4 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none text-sm" 
                                    placeholder="Write your inquiry here..."
                                ></textarea>
                            </div>

                            {toast && (
                                <div className={`px-4 py-3 rounded-lg text-center text-sm font-bold border mt-2 transition-all duration-300 ${
                                    toast.type === 'success' 
                                        ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                                        : 'bg-red-50 border-red-200 text-red-700'
                                }`}>
                                    {toast.message}
                                </div>
                            )}

                            <button 
                                type="submit" 
                                disabled={submitting} 
                                className={`w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all duration-300 mt-4 shadow-md hover:shadow-lg ${
                                    submitting 
                                        ? 'bg-slate-400 cursor-not-allowed shadow-none' 
                                        : 'bg-emerald-600 hover:bg-emerald-700 hover:-translate-y-0.5'
                                }`}
                            >
                                {submitting ? 'Sending Request...' : 'Send Message'}
                            </button>
                            
                            <p className="text-center text-xs text-slate-400 mt-4 font-medium">
                                We will get back to you within 24 hours.
                            </p>
                        </form>
                    </div>

                </div>
            </div>
        </section>
    );
}
