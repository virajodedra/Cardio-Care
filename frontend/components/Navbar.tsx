"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HeartPulse, Menu, X } from 'lucide-react';
import { ModeToggle } from '@/components/ModeToggle';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/model-info', label: 'Model Info' },
        { href: '/disclaimer', label: 'Disclaimer' },
    ];

    return (
        <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/60 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 shadow-sm transition-all duration-300">
            <div className="container flex h-16 items-center px-4 justify-between">
                <div className="flex items-center gap-2">
                    <HeartPulse className="h-6 w-6 text-primary animate-pulse" />
                    <Link href="/" className="text-xl font-bold text-foreground">
                        CardioCare
                    </Link>
                </div>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6 text-sm font-medium">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "transition-colors hover:text-foreground/80",
                                pathname === link.href ? "text-foreground" : "text-foreground/60"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center gap-2">
                    <Button variant="ghost" size="sm" asChild className="hidden md:flex">
                        <Link href="https://github.com/virajodedra" target="_blank">
                            GitHub
                        </Link>
                    </Button>
                    <ModeToggle />
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex md:hidden items-center gap-2">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 bg-background/95 backdrop-blur-xl overflow-hidden"
                    >
                        <div className="flex flex-col space-y-4 p-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        pathname === link.href ? "text-foreground" : "text-muted-foreground"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <Button variant="outline" size="sm" asChild className="w-full justify-start">
                                <Link href="https://github.com/virajodedra" target="_blank">
                                    GitHub
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
