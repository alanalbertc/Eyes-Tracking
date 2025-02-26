interface CarouselControlProps {
    direction: "prev" | "next";
    targetId: string;
}

const CarouselControl: React.FC<CarouselControlProps> = ({
    direction,
    targetId,
}) => {
    return (
        <div
            className={`my-auto mx-10 carousel-control-${direction} border border-gray-100 shadow backdrop-blur-lg rounded-full max-h-[3vh] md:max-h-[5vh]`}
            data-bs-target={`#${targetId}`}
            data-bs-slide={direction}
            style={{
                backgroundColor: "#09C0DF",
                width: "10%",
                maxWidth: "6vw",
                cursor: "pointer",
            }}
        >
            <span
                className={`carousel-control-${direction}-icon`}
                aria-hidden="true"
            />
            <span className="visually-hidden">
                {direction === "prev" ? "Previous" : "Next"}
            </span>
        </div>
    );
};

export default CarouselControl;
