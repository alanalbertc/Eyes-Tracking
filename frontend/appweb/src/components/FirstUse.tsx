import firsUseImage from "./../assets/home/how.png";


function FirstUse() {
    return (
        <>
            <div className="relative w-full md:w-[50vw] text-center">
                <div className="p-1 w-full">
                    <img src={firsUseImage}/>
                </div>
            </div>
        </>
    );
}

export default FirstUse;
