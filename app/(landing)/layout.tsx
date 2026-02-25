import AuthNav from "@/components/AuthNav";

interface LandingLayoutProps {
    children: React.ReactNode
}

export default function LandingLayout({children}: LandingLayoutProps) {
    return (
        <AuthNav>
            {children}
        </AuthNav>
    );
}