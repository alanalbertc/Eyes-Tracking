import Logo from "./../assets/logo.png";


function Header() {
    return (
        <>
            <header className="top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:my-6 md:top-6 md:rounded-3xl lg:max-w-screen-lg">
                <div className="px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex shrink-0" />

                        <div className="md:flex md:items-center md:justify-center md:gap-5">
                            <a
                                aria-current="page"
                                className="flex items-center"
                                href="/"
                            >
                                <img
                                    className="h-10 md:h-30 w-auto"
                                    src={Logo}
                                    alt=""
                                />
                                <p className="sr-only">Website Title</p>
                            </a>
                        </div>
                        <div className="flex items-center justify-end gap-3"></div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
