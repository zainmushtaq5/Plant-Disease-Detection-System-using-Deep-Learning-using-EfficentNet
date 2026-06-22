import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const navLinks = [
        { name: 'Home', path: '/' },
        { name: 'Detection', path: '/detection' },
        { name: 'Information', path: '/info' },
        { name: 'About', path: '/about' },
    ];

    return (
        <nav
            className={clsx(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                scrolled
                    ? 'bg-white/80 backdrop-blur-md shadow-sm py-4'
                    : 'bg-transparent py-6'
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <NavLink to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary-600 rounded-lg text-white transform group-hover:rotate-12 transition-transform duration-300">
                        <Leaf size={24} />
                    </div>
                    <span className={clsx(
                        "font-heading font-bold text-lg tracking-tight transition-colors",
                        scrolled ? "text-slate-900" : "text-slate-900"
                    )}>
                        Plant Disease <span className="text-primary-600">Detection System</span>
                    </span>
                </NavLink>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                clsx(
                                    'font-medium text-sm transition-all duration-300 relative',
                                    isActive
                                        ? 'text-primary-600'
                                        : 'text-slate-500 hover:text-slate-900'
                                )
                            }
                        >
                            {({ isActive }) => (
                                <>
                                    {link.name}
                                    {isActive && (
                                        <motion.div
                                            layoutId="navbar-indicator"
                                            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary-600 rounded-full"
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                    <NavLink
                        to="/detection"
                        className="btn-primary py-2 px-5 text-sm shadow-primary-600/20"
                    >
                        Start Detection
                    </NavLink>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-slate-700 focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Navigation Dropdown */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="container mx-auto px-6 py-6 flex flex-col space-y-4">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        clsx(
                                            'text-lg font-medium p-2 rounded-lg transition-colors',
                                            isActive
                                                ? 'bg-primary-50 text-primary-700'
                                                : 'text-slate-600 hover:bg-slate-50'
                                        )
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
