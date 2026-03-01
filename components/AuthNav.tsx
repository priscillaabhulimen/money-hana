'use client';
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

interface AuthNavProps {
    children: React.ReactNode
}

interface AppRoute {
    name: string,
    href: string[]
}

const routes: AppRoute[] = [
    { name: "Features",    href: ['/features'] },
    { name: "Pricing",     href: ['/pricing'] },
    { name: "Get Started", href: ['/register', '/login'] },
]

export default function AuthNav({ children }: AuthNavProps) {
    const pathname = usePathname();
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">

                {/* Top bar */}
                <div className="flex items-center justify-between px-4 pr-4 lg:pr-6">
                    <h1 className="my-2 text-xl font-bebas text-foreground px-2">
                        <span className="text-primary">MONEY</span>HANA
                    </h1>

                    {/* Desktop links */}
                    <ul className="hidden sm:flex gap-2">
                        {routes.map((route) => {
                            const isActive = route.href.includes(pathname);
                            return (
                                <li key={route.name.toLowerCase()}>
                                    <Link
                                        href={route.href[0]}
                                        className={`text-sm py-2 px-4 rounded-sm font-semibold transition-colors ${
                                            isActive
                                                ? 'bg-primary/15 text-primary font-bold'
                                                : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                    >
                                        {route.name}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setMenuOpen(o => !o)}
                        className="sm:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                {/* Mobile dropdown */}
                {menuOpen && (
                    <div className="sm:hidden border-t border-border px-3 pb-3 pt-2 flex flex-col gap-1">
                        {routes.map((route) => {
                            const isActive = route.href.includes(pathname);
                            return (
                                <Link
                                    key={route.name.toLowerCase()}
                                    href={route.href[0]}
                                    onClick={() => setMenuOpen(false)}
                                    className={`text-sm py-2.5 px-4 rounded-sm font-semibold transition-colors ${
                                        isActive
                                            ? 'bg-primary/15 text-foreground disabled cursor-default font-bold'
                                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                    }`}
                                >
                                    {route.name}
                                </Link>
                            );
                        })}
                    </div>
                )}
            </nav>

            <div className="flex flex-1">
                {children}
            </div>
        </div>
    );
}