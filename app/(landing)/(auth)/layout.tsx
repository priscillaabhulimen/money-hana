interface AuthLayoutProps {
    children: React.ReactNode
}

export default function AuthLayout({children}: AuthLayoutProps) {
    return (
        <div className="flex flex-col-reverse lg:flex-row flex-1">
            {children}
            {/* Side panel */}
            <div 
                className="h-60 mb-6 lg:mb-0 w-screen lg:w-[42%] lg:h-auto self-stretch flex lg:flex-col lg:justify-center bg-[url('/dark_bg.svg')] bg-cover bg-no-repeat bg-bottom lg:bg-center"
            >
                <div className="lg:ml-6 lg:mr-auto p-4 my-auto">
                <h1 className="text-5xl font-bebas text-white mb-2"><span className="text-[#1919bc]">MONEY</span>HANA</h1>
                <h2 className="text-lg text-white font-medium">Lorem ipsum... sit dolor amet.</h2>
                <p className="text-sm text-white/65 text-justify md:mr-18 font-light">{"I'm"} a little teapot short and stout, this is my handle, this is my spout. {"I'm"} a little teapot short and stout, this is my handle, this is my spout. {"I'm"} a little teapot short and stout, this is my handle, this is my spout.</p>
                </div>
            </div>
        </div>
    );
}