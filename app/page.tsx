"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import VideoGallery from "./components/VideoGallery";
import FireworkGallery from "./components/FireworkGallery";
import Footer from "./components/Footer";
import ProductCatalog from "./components/ProductCatalog";
import SafetyTips from "./components/SafetyTips";
import ContactSection from "./components/ContactSection";
import ContactFloatingButtons from "./components/ContactFloatingButtons";


export default function Home() {
  const [priceListUrl, setPriceListUrl] = useState("");
  const [bannerText, setBannerText] = useState("");
  const [minOrderValue, setMinOrderValue] = useState("");

  useEffect(() => {
    const fetchPriceList = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/api/settings/price-list`);
        if (res.ok) {
          const data = await res.json();
          let fetchedUrl = data.url || "";
          
          if (fetchedUrl.includes('localhost:5000') || fetchedUrl.includes('localhost:5001')) {
            try {
              const path = new URL(fetchedUrl).pathname;
              fetchedUrl = `${apiUrl}${path}`;
            } catch (e) {
              // ignore
            }
          }
          // Handle Mixed Content (http -> https)
          if (typeof window !== 'undefined' && window.location.protocol === 'https:' && fetchedUrl.startsWith('http://')) {
              fetchedUrl = fetchedUrl.replace('http://', 'https://');
          }
          
          setPriceListUrl(fetchedUrl);
        }
      } catch (e) {
        console.error("Error fetching price list:", e);
      }
    };
    const fetchBannerText = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/api/settings/banner-text/get`);
        if (res.ok) {
          const data = await res.json();
          setBannerText(data.text || "");
        }
      } catch (e) {
        console.error("Error fetching banner text:", e);
      }
    };
    const fetchMinOrderValue = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";
        const res = await fetch(`${apiUrl}/api/settings/min-order-value/get`);
        if (res.ok) {
          const data = await res.json();
          setMinOrderValue(data.value || "");
        }
      } catch (e) {
        console.error("Error fetching min order value:", e);
      }
    };

    fetchPriceList();
    fetchBannerText();
    fetchMinOrderValue();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex flex-col font-['Outfit'] selection:bg-festive-gold selection:text-festive-green">
      {bannerText && (
        <div className="bg-festive-green text-white py-2 overflow-hidden whitespace-nowrap relative border-b border-festive-gold/30">
          <style>{`
            @keyframes marquee-lr {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100vw); }
            }
            .animate-marquee-lr {
              display: inline-block;
              animation: marquee-lr 15s linear infinite;
            }
          `}</style>
          <div className="animate-marquee-lr font-bold tracking-wider text-sm md:text-base px-4">
            {bannerText}
          </div>
        </div>
      )}


      {/* NAVIGATION */}
      <Navbar priceListUrl={priceListUrl} />

      <main className="flex-grow pt-[100px] sm:pt-[110px] lg:pt-[125px] xl:pt-[135px]">
        {/* HERO SECTION */}
        <Banner priceListUrl={priceListUrl} />
        
        {/* MINIMUM ORDER VALUE BANNER */}
        {minOrderValue && Number(minOrderValue) > 0 && (
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 py-4 md:py-5 border-y-2 border-festive-gold relative overflow-hidden shadow-[0_20px_50px_rgb(0,0,0,0.08)] z-20">
            <div className="absolute inset-0 bg-[url('/assets/images/stars-pattern.png')] opacity-10 mix-blend-overlay"></div>
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-festive-gold rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-festive-gold rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            
            <div className="container mx-auto px-1 flex flex-row items-center justify-center gap-1 sm:gap-4 relative z-10 text-center flex-wrap">
              <span className="text-lg sm:text-xl animate-bounce shadow-festive-gold drop-shadow-lg">🎉</span>
              <h3 className="text-white font-semibold text-[12px] sm:text-xl md:text-xl tracking-wide uppercase drop-shadow-sm">
                <span className="hidden sm:inline">Minimum Order Value:</span>
                <span className="sm:hidden">Minimum Order:</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-festive-gold to-yellow-500 font-semibold ml-1 text-[14px] sm:text-xl md:text-xl">
                  ₹{Number(minOrderValue).toLocaleString('en-IN')}
                </span>
              </h3>
              <span className="text-lg sm:text-xl animate-bounce shadow-festive-gold drop-shadow-lg" style={{animationDelay: '0.2s'}}>🎉</span>
            </div>
          </div>
        )}
        
        {/* PRODUCT CATALOG */}
        <ProductCatalog priceListUrl={priceListUrl} />


        {/* FIREWORK IMAGE GALLERY SECTION */}
        <FireworkGallery />
        {/* PREMIUM TRUST BADGES SECTION */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24 relative overflow-hidden">
            {/* Soft decorative background accents */}
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-200 to-transparent"></div>
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl translate-y-1/2"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-10 md:mb-14">
                    <h2 className="text-xl md:text-xl font-semibold text-slate-800 tracking-tight mb-3">Why Choose Us?</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-6xl mx-auto">
                    {[
                      { 
                        label: "Sivakasi Direct", 
                        desc: "Straight from the hub",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" /></svg>
                      },
                      { 
                        label: "100% Quality", 
                        desc: "Rigorous testing",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" /></svg>
                      },
                      { 
                        label: "Wholesale Price", 
                        desc: "Best market rates",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" /></svg>
                      },
                      { 
                        label: "Safe Delivery", 
                        desc: "Secure packaging",
                        icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-emerald-600"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" /></svg>
                      }
                    ].map((item, index) => (
                      <div key={item.label} className="flex flex-col items-center p-6 sm:p-8 bg-white rounded-3xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(5,150,105,0.08)] group cursor-default transition-all duration-500 hover:-translate-y-2">
                          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500 mb-4 sm:mb-5">
                              {/* Swapping icon color on hover using a wrapper */}
                              <div className="group-hover:text-white transition-colors duration-500 [&>svg]:text-emerald-600 [&>svg]:group-hover:text-white">
                                  {item.icon}
                              </div>
                          </div>
                          <span className="text-slate-800 font-semibold text-sm sm:text-base tracking-wide text-center leading-tight mb-2">{item.label}</span>
                          <span className="text-slate-500 font-medium text-xs sm:text-sm text-center">{item.desc}</span>
                      </div>
                    ))}
                </div>
            </div>
        </section>

        {/* BRAND INTRODUCTION SECTION (CINEMATIC GLASSMORPHISM) */}
        <section id="about-us" className="relative pt-24 pb-8 md:pt-36 md:pb-12 overflow-hidden scroll-mt-24 min-h-[800px] flex items-center justify-center">
            {/* Full-width Cinematic Background */}
            <div className="absolute inset-0 z-0">
                <img 
                    src="/assets/images/gallery/firework_4.png" 
                    alt="Cinematic Background" 
                    className="w-full h-full object-cover scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]" 
                    style={{ objectPosition: 'center top' }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/95 via-slate-900/85 to-slate-950/95 backdrop-blur-[2px]"></div>
                <div className="absolute inset-0 bg-emerald-900/20 mix-blend-color"></div>
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col items-center">
                {/* The Floating Glass Island - Now 2-Column Wide Layout */}
                <div className="w-full max-w-[95%] xl:max-w-7xl rounded-[3rem] bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_30px_60px_rgba(0,0,0,0.5)] p-8 md:p-12 lg:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center lg:items-stretch gap-12 lg:gap-16 group">
                    {/* Internal glowing orb */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/10 rounded-full blur-[150px] group-hover:scale-110 transition-transform duration-1000 pointer-events-none"></div>

                    {/* Left Column: Logo & Text */}
                    <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
                        {/* Majestic Floating Dual-Logo Badge */}
                        <div className="relative mb-10 group cursor-pointer">
                            {/* Outer rotating glow ring */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 rounded-full blur-xl opacity-30 group-hover:opacity-70 group-hover:-inset-5 transition-all duration-1000 animate-[spin_6s_linear_infinite]"></div>
                            
                            {/* Inner Premium Badge Container - Pill Shape */}
                            <div className="relative bg-white/95 backdrop-blur-md rounded-full flex flex-row items-center justify-center p-4 px-8 md:p-5 md:px-10 gap-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-[3px] border-white/80 group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                {/* Soft inner shadow & gloss */}
                                <div className="absolute inset-0 shadow-[inset_0_4px_15px_rgba(0,0,0,0.1)] rounded-full pointer-events-none"></div>
                                
                                {/* Logo 1: Gurupriya Primary Logo */}
                                <img 
                                    src="/assets/images/gurupriya_pyropark_logo_primary.png" 
                                    alt="Gurupriya Pyro Park" 
                                    className="h-14 sm:h-16 md:h-20 object-contain hover:scale-110 transition-transform duration-700 relative z-10"
                                />
                                
                                {/* Elegant Divider */}
                                <div className="w-[2px] h-14 md:h-20 bg-gradient-to-b from-transparent via-gray-300 to-transparent relative z-10"></div>
                                
                                {/* Logo 2: Charger Brand Trademark Logo */}
                                <img 
                                    src="/assets/images/gurupriya_pyropark_logo.png" 
                                    alt="Charger Brand Trademark" 
                                    className="h-14 sm:h-16 md:h-20 object-contain hover:scale-110 transition-transform duration-700 relative z-10"
                                />
                            </div>
                            
                            {/* Sparkle effects */}
                            <div className="absolute -top-4 right-2 text-xl animate-bounce">✨</div>
                            <div className="absolute -bottom-2 left-2 text-xl animate-[bounce_2s_infinite]">✨</div>
                        </div>

                        <h2 className="text-xl md:text-xl lg:text-xl xl:text-xl font-semibold text-white mb-6 leading-[1.2] uppercase tracking-tighter drop-shadow-2xl">
                            Bringing The <br className="hidden lg:block"/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-500 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Spark</span> <br className="hidden lg:block"/>
                            To Your Celebrations
                        </h2>

                        <div className="space-y-6 max-w-2xl">
                            <p className="text-slate-200 text-lg md:text-xl leading-relaxed font-light">
                                Welcome to <strong className="text-white font-bold tracking-wide">Gurupriya Pyro Park</strong>, your premier destination for high-quality fireworks direct from the manufacturing capital of India—<strong className="text-emerald-400 font-bold tracking-wide">Sivakasi</strong>.
                            </p>
                            <p className="text-slate-400 text-sm md:text-base leading-relaxed">
                                Our curated collections range from traditional sparklers to grand sky shows, all tested for maximum safety and spectacular performance. We pride ourselves on offering wholesale prices directly to our customers.
                            </p>
                        </div>
                    </div>

                    {/* Divider for mobile (horizontal) and desktop (vertical) */}
                    <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent lg:hidden my-2"></div>
                    <div className="hidden lg:block w-[1px] h-auto bg-gradient-to-b from-transparent via-white/20 to-transparent mx-4"></div>

                    {/* Right Column: Sleek Floating Metrics Stack */}
                    <div className="w-full lg:w-1/2 flex flex-col justify-center gap-5 md:gap-6 relative z-10">
                        {/* Metric 1 */}
                        <div className="bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-[2rem] p-5 md:p-6 flex items-center gap-6 transition-all duration-300 hover:-translate-x-2 shadow-[0_10px_30px_rgba(0,0,0,0.1)] group/metric">
                            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-white/10 flex items-center justify-center text-xl md:text-xl border border-white/20 group-hover/metric:scale-110 group-hover/metric:rotate-3 transition-all duration-300">
                                🏭
                            </div>
                            <div className="text-left">
                                <h4 className="text-white font-semibold text-base md:text-lg uppercase tracking-wider mb-1">Sivakasi Direct</h4>
                                <p className="text-slate-400 text-[10px] md:text-xs uppercase tracking-wider">Authentic Quality</p>
                            </div>
                        </div>

                        {/* Metric 2 */}
                        <div className="bg-white/5 hover:bg-emerald-900/40 backdrop-blur-md border border-white/10 hover:border-emerald-500/30 rounded-[2rem] p-5 md:p-6 flex items-center gap-6 transition-all duration-300 hover:-translate-x-2 shadow-[0_10px_30px_rgba(0,0,0,0.1)] group/metric">
                            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-xl md:text-xl border border-emerald-500/30 group-hover/metric:scale-110 group-hover/metric:-rotate-3 transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                                ✅
                            </div>
                            <div className="text-left">
                                <h4 className="text-emerald-50 font-semibold text-base md:text-lg uppercase tracking-wider mb-1">100% Safe</h4>
                                <p className="text-emerald-400/80 text-[10px] md:text-xs uppercase tracking-wider">Tested & Certified</p>
                            </div>
                        </div>

                        {/* Metric 3 (Highlighted) */}
                        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 hover:from-amber-500/20 hover:to-orange-500/20 backdrop-blur-md border border-amber-500/30 rounded-[2rem] p-5 md:p-6 flex items-center gap-6 transition-all duration-300 hover:-translate-x-2 shadow-[0_15px_40px_rgba(245,158,11,0.15)] group/metric relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover/metric:animate-[shimmer_1.5s_infinite] skew-x-12"></div>
                            
                            <div className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-2xl bg-amber-500/20 flex items-center justify-center text-xl md:text-xl border border-amber-500/40 group-hover/metric:scale-110 group-hover/metric:rotate-12 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.3)] relative z-10">
                                💰
                            </div>
                            <div className="text-left relative z-10">
                                <h4 className="text-white font-semibold text-base md:text-lg uppercase tracking-wider mb-1">Wholesale Price</h4>
                                <p className="text-amber-300 text-[10px] md:text-xs uppercase tracking-wider">Best Market Price</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>


        {/* OUR BRANDS SECTION */}


        {/* SAFETY TIPS SECTION */}
        <SafetyTips />

        {/* CONTACT SECTION */}
        <ContactSection />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* FLOATING CONTACT BUTTONS */}
      <ContactFloatingButtons />

    </div>
  );
}
