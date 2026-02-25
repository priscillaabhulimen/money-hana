'use client';

interface AuthNavProps {
    children: React.ReactNode
}

export default function AuthNav({children}: AuthNavProps) {
    return <div className="flex flex-col min-h-screen">
        <nav className="h-12 bg-gray-600"></nav>
        <div className="flex flex-1">
            {children}
        </div>
    </div>;
}