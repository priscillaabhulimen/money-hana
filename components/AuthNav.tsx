'use client';

import Link from "next/link";

interface AuthNavProps {
    children: React.ReactNode
}

interface AppRoute {
    name: string,
    href: string
}

const routes: AppRoute[] = [
    {name: "Features", href: '/features'},
    {name: "Pricing", href: '/pricing'},
    {name: "Register", href: "/register"},
]

export default function AuthNav({children}: AuthNavProps) {
    return <div className="flex flex-col min-h-screen">
        <nav className="py-2 pr-6 flex gap-2 justify-between">
            <h1 className="text-xl font-bebas text-[#04040a] ml-3  px-4"><span className="text-[#1919bc]">MONEY</span>HANA</h1>
            <ul className="flex gap-2 justify-end">
                {routes.map((route) => 
                    <li 
                        key={route.name.toLowerCase()} 
                    >
                        <Link 
                            href={route.href}
                            className={`text-sm px-4 font-semibold`}
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