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
        <section className="w-full py-12 px-4 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="flex flex-col lg:flex-row justify-center">
                        
                        
                        {/* Right side - Content */}
                        <div className="lg:w-3/5 p-6 lg:p-8">
                            <div className="inline-block px-3 py-1 bg-indigo-100 text-[#422ad5] rounded-full text-sm font-medium mb-4">
                                Limited Time Offer
                            </div>
                            
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
                                Home Services Bundle
                            </h2>
                            
                            <p className="text-gray-600 mb-6">
                                Book any two household services and get 25% off your entire order! 
                                Perfect time to tackle multiple home projects.
                            </p>
                            
                            {/* Timer */}
                            <div className="mb-6">
                                <p className="text-sm font-medium text-gray-500 mb-3">OFFER ENDS IN:</p>
                                <div className="flex space-x-3">
                                    <div className="flex flex-col items-center">
                                        <div className="bg-indigo-50 rounded-lg px-3 py-2 w-16 text-center">
                                            <span className="text-xl font-mono font-bold text-[#422ad5]">{timeLeft.days}</span>
                                        </div>
                                        <span className="text-xs mt-1 text-gray-500">Days</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-indigo-50 rounded-lg px-3 py-2 w-16 text-center">
                                            <span className="text-xl font-mono font-bold text-[#422ad5]">{timeLeft.hours}</span>
                                        </div>
                                        <span className="text-xs mt-1 text-gray-500">Hours</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-indigo-50 rounded-lg px-3 py-2 w-16 text-center">
                                            <span className="text-xl font-mono font-bold text-[#422ad5]">{timeLeft.minutes}</span>
                                        </div>
                                        <span className="text-xs mt-1 text-gray-500">Min</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <div className="bg-indigo-50 rounded-lg px-3 py-2 w-16 text-center">
                                            <span className="text-xl font-mono font-bold text-[#422ad5]">{timeLeft.seconds}</span>
                                        </div>
                                        <span className="text-xs mt-1 text-gray-500">Sec</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Eligible Services */}
                            <div className="mb-6">
                                <p className="text-sm font-medium mb-3">ELIGIBLE SERVICES:</p>
                                <div className="grid grid-cols-2 gap-y-2 gap-x-4">
                                    {['Cleaning', 'Plumbing', 'Electrical', 'Painting', 'Gardening', 'Home Repairs'].map((service) => (
                                        <div key={service} className="flex items-center text-gray-600">
                                            <svg className="w-5 h-5 mr-2 text-[#422ad5]" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            {service}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Promo code */}
                            <div className="mb-6">
                                <div className="flex">
                                    <input 
                                        type="text" 
                                        value="HOUSECOMBO25" 
                                        className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 bg-gray-50" 
                                        readOnly 
                                    />
                                    <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 rounded-r-lg border border-l-0 border-gray-300 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                        </svg>                                          
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Copy code to use at checkout</p>
                            </div>
                            
                            {/* Bundle benefit */}
                            <div className="flex items-start gap-3 p-4 bg-indigo-50 rounded-lg mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#422ad5] mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <div>
                                    <span className="font-medium">Bundle & Save!</span> Schedule multiple services on the same day for maximum convenience.
                                </div>
                            </div>
                            
                            {/* CTA Button */}
                            <button className="w-full sm:w-auto px-6 py-3 bg-[#422ad5] hover:bg-indigo-700 text-white font-medium rounded-lg flex items-center justify-center">
                                Book Services
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DiscountSection;