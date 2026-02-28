'use client';
import { usePathname } from "next/navigation";
import Link from "next/link";

interface AuthNavProps {
    children: React.ReactNode
}

interface AppRoute {
    name: string,
    href: string[]
}

const routes: AppRoute[] = [
    {name: "Features", href: ['/features']},
    {name: "Pricing", href: ['/pricing']},
    {name: "Get Started", href: ['/register', '/login']},
]

// AuthNav sits on bg-background (white in light, dark in dark mode).
// text-foreground is safe here — it flips correctly with the theme.
// Active pill uses bg-primary/15 + text-primary so it works in both modes.
export default function AuthNav({children}: AuthNavProps) {
    const pathname = usePathname();

    return (
        <div className="flex flex-col min-h-screen">
            <nav className="sticky top-0 z-50 bg-background pr-6 flex gap-2 justify-between items-center shadow-sm border-b border-border">
                <h1 className="my-2 text-xl font-bebas text-foreground ml-3 px-4">
                    <span className="text-primary">MONEY</span>HANA
                </h1>
                <ul className="flex gap-2 justify-end">
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
            </nav>
            <div className="flex flex-1">
                {children}
            </div>
        </div>
    );
}