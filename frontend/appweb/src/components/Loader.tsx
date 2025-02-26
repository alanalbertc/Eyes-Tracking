function Loader() {
    return (
        <>
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2 z-0">
                <div className="p-4 bg-gradient-to-tr animate-spin from-white to-cyan-500 via-white rounded-full">
                    <div className="bg-white rounded-full">
                        <div className="w-24 h-24 rounded-full"></div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Loader;
