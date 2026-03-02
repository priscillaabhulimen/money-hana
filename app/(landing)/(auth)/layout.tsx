interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <div className="flex flex-col-reverse lg:flex-row flex-1">
            {children}
            {/* Side panel — always a dark surface regardless of theme */}
            <div
                className="h-60 mb-6 lg:mb-0 w-screen lg:w-[42%] lg:h-auto self-stretch flex lg:flex-col lg:justify-center bg-[url('/dark_bg.svg')] bg-cover bg-no-repeat bg-bottom lg:bg-center"
            >
                <div className="lg:ml-6 lg:mr-auto p-4 my-auto">
                    <h1 className="text-5xl font-bebas text-white">
                        <span className="text-primary">MONEY</span>HANA
                    </h1>
                    <h2 className="text-md text-white font-light italic mb-2">...knows where it went. Even when {"you'd"} rather not</h2>
                    <p className="text-sm text-white/65 text-justify md:mr-18 font-light">Your money has been living rent free in your head.<br />Time to give it an address.</p>
                </div>
            </div>
        </div>
    );
}