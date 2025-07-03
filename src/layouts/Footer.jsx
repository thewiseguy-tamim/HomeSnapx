import React from 'react';
import { Twitter, Youtube, Facebook, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                    
                    .footer-container {
                        background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
                        position: relative;
                    }
                    
                    .footer-container::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: 
                            radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                            radial-gradient(circle at 70% 60%, rgba(139, 69, 193, 0.08) 0%, transparent 50%);
                        pointer-events: none;
                    }
                    
                    .footer-content {
                        position: relative;
                        z-index: 1;
                    }
                    
                    .footer-section {
                        padding: 0;
                    }
                    
                    .brand-title {
                        font-size: 1.875rem;
                        font-weight: 700;
                        background: linear-gradient(135deg, #3b82f6, #8b5cf6);
                        -webkit-background-clip: text;
                        background-clip: text;
                        -webkit-text-fill-color: transparent;
                        margin-bottom: 0.75rem;
                    }
                    
                    .brand-description {
                        color: #94a3b8;
                        font-size: 0.875rem;
                        line-height: 1.6;
                        margin-bottom: 1.5rem;
                    }
                    
                    .section-title {
                        color: #e2e8f0;
                        font-weight: 600;
                        font-size: 1rem;
                        margin-bottom: 1rem;
                    }
                    
                    .footer-link {
                        color: #94a3b8;
                        text-decoration: none;
                        font-size: 0.875rem;
                        padding: 0.5rem 0;
                        display: block;
                        transition: all 0.2s ease;
                        position: relative;
                    }
                    
                    .footer-link:hover {
                        color: #60a5fa;
                        padding-left: 0.75rem;
                    }
                    
                    .footer-link::before {
                        content: '';
                        position: absolute;
                        left: 0;
                        top: 50%;
                        transform: translateY(-50%);
                        width: 0;
                        height: 1px;
                        background: #3b82f6;
                        transition: width 0.2s ease;
                    }
                    
                    .footer-link:hover::before {
                        width: 0.5rem;
                    }
                    
                    .contact-info {
                        display: flex;
                        align-items: center;
                        gap: 0.75rem;
                        color: #94a3b8;
                        font-size: 0.875rem;
                        margin-bottom: 0.75rem;
                        transition: color 0.2s ease;
                    }
                    
                    .contact-info:hover {
                        color: #cbd5e1;
                    }
                    
                    .contact-icon {
                        color: #3b82f6;
                        flex-shrink: 0;
                    }
                    
                    .newsletter-section {
                        margin-bottom: 1.5rem;
                    }
                    
                    .newsletter-input {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background: rgba(255, 255, 255, 0.05);
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        border-radius: 8px;
                        color: #e2e8f0;
                        font-size: 0.875rem;
                        transition: all 0.2s ease;
                        margin-bottom: 0.75rem;
                    }
                    
                    .newsletter-input:focus {
                        outline: none;
                        border-color: #3b82f6;
                        background: rgba(255, 255, 255, 0.08);
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
                    }
                    
                    .newsletter-input::placeholder {
                        color: #64748b;
                    }
                    
                    .newsletter-btn {
                        width: 100%;
                        padding: 0.75rem 1rem;
                        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                        border: none;
                        border-radius: 8px;
                        color: white;
                        font-weight: 500;
                        font-size: 0.875rem;
                        cursor: pointer;
                        transition: all 0.2s ease;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        gap: 0.5rem;
                    }
                    
                    .newsletter-btn:hover {
                        transform: translateY(-1px);
                        box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                    }
                    
                    .social-links {
                        display: flex;
                        gap: 0.75rem;
                        margin-top: 1rem;
                    }
                    
                    .social-icon {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 2.5rem;
                        height: 2.5rem;
                        background: rgba(255, 255, 255, 0.05);
                        border-radius: 8px;
                        color: #94a3b8;
                        transition: all 0.2s ease;
                        text-decoration: none;
                    }
                    
                    .social-icon:hover {
                        background: rgba(59, 130, 246, 0.1);
                        color: #60a5fa;
                        transform: translateY(-2px);
                    }
                    
                    .footer-bottom {
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                        padding: 1.5rem 0;
                        text-align: center;
                        color: #64748b;
                        font-size: 0.875rem;
                    }
                    
                    .divider {
                        width: 100%;
                        height: 1px;
                        background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.3), transparent);
                        margin: 2rem 0;
                    }
                `}
            </style>

            <footer className="footer-container text-white font-inter">
                <div className="footer-content">
                    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                            
                            {/* Company Info */}
                            <div className="footer-section">
                                <div className="brand-title">HomeSnap</div>
                                <p className="brand-description">
                                    Transform your home with our premium professional services. Quality craftsmanship and reliable service guaranteed.
                                </p>
                                
                                <div className="space-y-1">
                                    <div className="contact-info">
                                        <Phone className="contact-icon" size={16} />
                                        <span>(+880) 190-200-1000</span>
                                    </div>
                                    
                                    <div className="contact-info">
                                        <Mail className="contact-icon" size={16} />
                                        <span>support@homesnap.com</span>
                                    </div>
                                    
                                    <div className="contact-info">
                                        <MapPin className="contact-icon" size={16} />
                                        <span>Mirpur, Dhaka-1216</span>
                                    </div>
                                </div>
                            </div>

                            {/* Company Links */}
                            <div className="footer-section">
                                <h6 className="section-title">Company</h6>
                                <div>
                                    <Link to="/about" className="footer-link">About Us</Link>
                                    <Link to="/contact" className="footer-link">Contact</Link>
                                    
                                </div>
                            </div>

                            {/* Newsletter & Social */}
                            <div className="footer-section">
                                <h6 className="section-title">Stay Connected</h6>
                                
                                <div className="newsletter-section">
                                    <input 
                                        type="email" 
                                        placeholder="Enter your email" 
                                        className="newsletter-input"
                                    />
                                    <button className="newsletter-btn">
                                        Subscribe
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                                
                                
                            </div>
                        </div>
                        
                        <div className="divider"></div>
                        

                        <div className="flex justify-center">© 2025 HomeSnap. All rights reserved.</div>
                       
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;