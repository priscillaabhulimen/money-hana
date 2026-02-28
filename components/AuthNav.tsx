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

export default function AuthNav({children}: AuthNavProps) {
    const pathname = usePathname();

    return <div className="flex flex-col min-h-screen">
        <nav className="sticky top-0 z-50 bg-background pr-6 flex gap-2 justify-between items-center shadow-sm">
            <h1 className="my-2 text-xl font-bebas text-foreground ml-3  px-4"><span className="text-primary">MONEY</span>HANA</h1>
            <ul className="flex gap-2 justify-end">
                {routes.map((route) => 
                    <li 
                        key={route.name.toLowerCase()} 
                    >
                        <Link 
                            href={route.href[0]}
                            className={`text-sm py-3 px-4 rounded-sm font-semibold text-muted-foreground ${route.href.includes(pathname) ? 'bg-sidebar-primary font-bold text-foreground' : 'text-muted-foreground'}`}
                        >{route.name}</Link>
                    </li>
                )}
            </ul>
            
        </nav>
        <div className="flex flex-1">
            {children}
        </div>
    </div>;
}