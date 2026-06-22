import { Leaf, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="md:col-span-1">
                        <Link to="/" className="flex items-center gap-2 mb-6">
                            <div className="p-2 bg-primary-600 rounded-lg">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-heading font-bold text-white tracking-tight">
                                Plant Disease Detection
                            </span>
                        </Link>
                        <p className="text-sm leading-relaxed text-slate-400">
                            Empowering agriculture through advanced AI technology. Helping farmers protect their crops with instant, accurate disease detection.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Quick Links</h4>
                        <ul className="space-y-4 text-sm">
                            <li><Link to="/" className="hover:text-primary-400 transition-colors">Home</Link></li>
                            <li><Link to="/detection" className="hover:text-primary-400 transition-colors">Disease Detection</Link></li>
                            <li><Link to="/info" className="hover:text-primary-400 transition-colors">System Info</Link></li>
                            <li><Link to="/about" className="hover:text-primary-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Resources</h4>
                        <ul className="space-y-4 text-sm">
                            <li><a href="#" className="hover:text-primary-400 transition-colors">API Documentation</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Common Diseases</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Research Paper</a></li>
                            <li><a href="#" className="hover:text-primary-400 transition-colors">Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-6">Get in Touch</h4>
                        <div className="flex gap-4 mb-6">
                            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                                <Github size={18} />
                            </button>
                            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                                <Linkedin size={18} />
                            </button>
                            <button className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors">
                                <Mail size={18} />
                            </button>
                        </div>
                        <p className="text-sm text-slate-400">
                            Questions or feedback? <br />
                            Contact us at support@plantdisease.ai
                        </p>
                    </div>
                </div>

                <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-4 text-xs text-slate-500">
                    <p>© {new Date().getFullYear()} Plant Disease Detection System. All rights reserved.</p>
                    <div className="flex gap-6">
                        <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
