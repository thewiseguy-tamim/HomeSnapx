import { useState, useEffect } from 'react';

const DiscountSection = () => {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    useEffect(() => {
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 10);
        
        const timer = setInterval(() => {
            const now = new Date();
            const difference = endDate - now;
            
            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / (1000 * 60)) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        }, 1000);
        
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-24 px-6 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent transform -skew-y-12"></div>
            </div>
            
            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center text-white">
                    {/* Limited offer badge */}
                    <div className="inline-flex items-center px-4 py-2 bg-amber-500 text-white rounded-full text-sm font-semibold mb-6 shadow-lg">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                        </svg>
                        Limited Time Offer
                    </div>

                    {/* Main title */}
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                        Home Services Bundle
                    </h2>

                    {/* Description */}
                    <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
                        Book any two household services and get <span className="font-bold text-amber-400">25% off</span> your entire order! Perfect time to tackle multiple home projects.
                    </p>

                    {/* Countdown timer */}
                    <div className="mb-12">
                        <p className="text-sm font-medium text-blue-200 mb-4 tracking-wider">OFFER ENDS IN:</p>
                        <div className="flex justify-center space-x-4">
                            {[
                                { value: timeLeft.days, label: 'Days' },
                                { value: timeLeft.hours, label: 'Hours' },
                                { value: timeLeft.minutes, label: 'Minutes' },
                                { value: timeLeft.seconds, label: 'Seconds' }
                            ].map((item, index) => (
                                <div key={index} className="flex flex-col items-center">
                                    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl px-4 py-3 w-20 border border-white border-opacity-20 shadow-xl">
                                        <span className="text-2xl md:text-3xl font-mono font-bold text-black">

                                            {String(item.value).padStart(2, '0')}
                                        </span>
                                    </div>
                                    <span className="text-xs mt-2 text-blue-200 font-medium tracking-wide">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Services grid */}
                    <div className="mb-12">
                        <p className="text-sm font-medium text-blue-200 mb-6 tracking-wider">ELIGIBLE SERVICES:</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                            {['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Gardening', 'Home Repairs'].map((service, index) => (
                                <div key={service} className="flex items-center justify-center p-4 bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20 hover:bg-opacity-20 transition-all duration-300">
                                    <div className="flex items-center text-white">
                                        <div className="w-8 h-8 mr-3 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                        <span className="font-medium text-black">{service}</span>

                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Promo code section */}
                    <div className="mb-10 max-w-md mx-auto">
                        <p className="text-sm font-medium text-blue-200 mb-3 tracking-wider">PROMO CODE:</p>
                        <div className="flex bg-white bg-opacity-10 backdrop-blur-md rounded-xl border border-white border-opacity-20 overflow-hidden">
                            <input 
                                type="text" 
                                value="HOUSECOMBO25" 
                                className="flex-1 bg-transparent text-black placeholder-blue-200 px-4 py-3 text-center font-mono font-bold text-lg focus:outline-none" 
                                readOnly 
                            />
                            <button 
                                onClick={() => navigator.clipboard.writeText('HOUSECOMBO25')}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 flex items-center transition-colors duration-200 font-medium"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-1">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                </svg>
                                Copy
                            </button>
                        </div>
                        <p className="text-xs text-blue-200 mt-2 opacity-75">Click to copy code for checkout</p>
                    </div>

                    {/* Bundle benefit */}
                    <div className="flex items-center justify-center gap-3 p-6 bg-amber-500 bg-opacity-20 backdrop-blur-md rounded-xl mb-10 border border-amber-400 border-opacity-30 max-w-2xl mx-auto">
                        <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div className="text-white">
                            <span className="font-bold">Bundle & Save!</span> Schedule multiple services on the same day for maximum convenience.
                        </div>
                    </div>

                    {/* CTA Button */}
                    <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 text-lg">
                        Book Services Now
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </button>

                    {/* Additional trust indicator */}
                    <p className="text-sm text-blue-200 mt-6 opacity-75">
                        ✓ No hidden fees • ✓ Professional service • ✓ 100% satisfaction guarantee
                    </p>
                </div>
            </div>
        </section>
    );
};

export default DiscountSection;