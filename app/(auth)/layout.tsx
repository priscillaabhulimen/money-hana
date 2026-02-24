import AuthNav from "@/components/AuthNav";

interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <AuthNav>
            {children}
        </AuthNav>
    );
}