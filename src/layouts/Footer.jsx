import React from 'react';
import { Twitter, Youtube, Facebook, Mail, Phone, MapPin, ArrowRight, Heart } from 'lucide-react';

const Footer = () => {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');
                    
                    .footer-gradient {
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .footer-gradient::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: 
                            radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(124, 58, 237, 0.1) 0%, transparent 50%);
                        pointer-events: none;
                    }
                    
                    .footer-content {
                        position: relative;
                        z-index: 1;
                    }
                    
                    .footer-section {
                        backdrop-filter: blur(10px);
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 16px;
                        padding: 2rem;
                        transition: all 0.3s ease;
                        height: 100%;
                    }
                    
                    .footer-section:hover {
                        transform: translateY(-4px);
                        background: rgba(255, 255, 255, 0.08);
                        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
                    }
                    
                    .footer-title {
                        background: linear-gradient(135deg, #3b82f6, #60a5fa);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 700;
                        font-size: 1.125rem;
                        margin-bottom: 1.5rem;
                        position: relative;
                    }
                    
                    .footer-title::after {
                        content: '';
                        position: absolute;
                        bottom: -8px;
                        left: 0;
                        width: 40px;
                        height: 3px;
                        background: linear-gradient(90deg, #3b82f6, #7c3aed);
                        border-radius: 2px;
                    }
                    
                    .footer-link {
                        color: rgba(255, 255, 255, 0.8);
                        text-decoration: none;
                        font-weight: 400;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        padding: 0.5rem 0;
                        border-radius: 8px;
                        padding-left: 0.5rem;
                        margin-left: -0.5rem;
                    }
                    
                    .footer-link:hover {
                        color: #60a5fa;
                        transform: translateX(8px);
                        background: rgba(59, 130, 246, 0.1);
                        padding-left: 1rem;
                    }
                    
                    .footer-link::before {
                        content: '';
                        width: 4px;
                        height: 4px;
                        background: #3b82f6;
                        border-radius: 50%;
                        margin-right: 0.75rem;
                        opacity: 0;
                        transition: opacity 0.3s ease;
                    }
                    
                    .footer-link:hover::before {
                        opacity: 1;
                    }
                    
                    .social-icon {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        padding: 12px;
                        color: rgba(255, 255, 255, 0.8);
                        transition: all 0.3s ease;
                        backdrop-filter: blur(10px);
                    }
                    
                    .social-icon:hover {
                        background: linear-gradient(135deg, #3b82f6, #7c3aed);
                        color: white;
                        transform: translateY(-4px) scale(1.1);
                        box-shadow: 0 12px 24px rgba(59, 130, 246, 0.3);
                        border-color: transparent;
                    }
                    
                    .newsletter-input {
                        background: rgba(255, 255, 255, 0.1);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        border-radius: 12px;
                        padding: 1rem;
                        color: white;
                        width: 100%;
                        backdrop-filter: blur(10px);
                        transition: all 0.3s ease;
                    }
                    
                    .newsletter-input:focus {
                        outline: none;
                        border-color: #3b82f6;
                        background: rgba(255, 255, 255, 0.15);
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
                    }
                    
                    .newsletter-input::placeholder {
                        color: rgba(255, 255, 255, 0.6);
                    }
                    
                    .newsletter-btn {
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        border: none;
                        color: white;
                        padding: 1rem 1.5rem;
                        border-radius: 12px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        margin-top: 1rem;
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .newsletter-btn:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 12px 24px rgba(59, 130, 246, 0.4);
                        background: linear-gradient(135deg, #1d4ed8, #1e40af);
                    }
                    
                    .logo-footer {
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8, #7c3aed);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        font-weight: 800;
                        font-size: 2rem;
                        letter-spacing: -0.025em;
                        margin-bottom: 1rem;
                    }
                    
                    .contact-item {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        color: rgba(255, 255, 255, 0.8);
                        margin-bottom: 1rem;
                        transition: all 0.3s ease;
                        padding: 0.5rem;
                        border-radius: 8px;
                    }
                    
                    .contact-item:hover {
                        color: #60a5fa;
                        background: rgba(59, 130, 246, 0.1);
                        transform: translateX(4px);
                    }
                    
                    .contact-icon {
                        background: rgba(59, 130, 246, 0.2);
                        border-radius: 8px;
                        padding: 8px;
                        color: #60a5fa;
                    }
                    
                    .bottom-bar {
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        backdrop-filter: blur(10px);
                        background: rgba(0, 0, 0, 0.3);
                    }
                    
                    .heart-icon {
                        color: #ef4444;
                        animation: heartbeat 2s infinite;
                    }
                    
                    @keyframes heartbeat {
                        0%, 100% { transform: scale(1); }
                        50% { transform: scale(1.1); }
                    }
                    
                    .service-grid {
                        display: grid;
                        gap: 0.75rem;
                    }
                `}
            </style>

            <footer className="footer-gradient text-white">
                <div className="footer-content">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            
                            {/* Company Info */}
                            <div className="footer-section">
                                <div className="logo-footer font-inter">
                                    HomeSnap
                                </div>
                                <p className="text-slate-300 mb-6 leading-relaxed">
                                    Transform your home with our premium professional services. Quality craftsmanship, reliable service, guaranteed satisfaction.
                                </p>
                                
                                <div className="space-y-2">
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <Phone size={16} />
                                        </div>
                                        <span className="text-sm">+1 (555) 123-4567</span>
                                    </div>
                                    
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <Mail size={16} />
                                        </div>
                                        <span className="text-sm">hello@homesnap.com</span>
                                    </div>
                                    
                                    <div className="contact-item">
                                        <div className="contact-icon">
                                            <MapPin size={16} />
                                        </div>
                                        <span className="text-sm">123 Service St, City, State 12345</span>
                                    </div>
                                </div>
                            </div>

                            {/* Services */}
                            <div className="footer-section">
                                <h6 className="footer-title font-inter">Our Services</h6>
                                <div className="service-grid">
                                    <a href="#" className="footer-link font-inter">Home Cleaning</a>
                                    <a href="#" className="footer-link font-inter">Carpentry & Repair</a>
                                    <a href="#" className="footer-link font-inter">Interior Painting</a>
                                    <a href="#" className="footer-link font-inter">Plumbing Services</a>
                                    <a href="#" className="footer-link font-inter">Electrical Work</a>
                                    <a href="#" className="footer-link font-inter">Garden Maintenance</a>
                                </div>
                            </div>

                            {/* Company */}
                            <div className="footer-section">
                                <h6 className="footer-title font-inter">Company</h6>
                                <div className="service-grid">
                                    <a href="#" className="footer-link font-inter">About Us</a>
                                    <a href="#" className="footer-link font-inter">Our Team</a>
                                    <a href="#" className="footer-link font-inter">Careers</a>
                                    <a href="#" className="footer-link font-inter">Contact</a>
                                    <a href="#" className="footer-link font-inter">Privacy Policy</a>
                                    <a href="#" className="footer-link font-inter">Terms of Service</a>
                                </div>
                            </div>

                            {/* Newsletter & Social */}
                            <div className="footer-section">
                                <h6 className="footer-title font-inter">Stay Connected</h6>
                                <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                                    Subscribe to get updates on our latest services and special offers.
                                </p>
                                
                                <div className="mb-6">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="newsletter-input font-inter"
                                    />
                                    <button className="newsletter-btn font-inter">
                                        Subscribe
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                                
                                <div className="space-y-4">
                                    <div className="text-slate-300 text-sm font-medium">Follow Us</div>
                                    <div className="flex gap-3">
                                        <a href="#" className="social-icon">
                                            <Facebook size={20} />
                                        </a>
                                        <a href="#" className="social-icon">
                                            <Twitter size={20} />
                                        </a>
                                        <a href="#" className="social-icon">
                                            <Youtube size={20} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="bottom-bar">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                                <div className="text-slate-400 text-sm font-inter">
                                    © 2025 HomeSnap. All rights reserved.
                                </div>
                                <div className="flex items-center gap-1 text-slate-400 text-sm font-inter">
                                    Made with <Heart size={16} className="heart-icon" /> by Tamim Islam
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;