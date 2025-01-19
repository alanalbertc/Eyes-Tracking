interface ButtonProps {
  color: string;
  handleSaludar: (text: string) => void;
}

function Button({ color, handleSaludar }: ButtonProps) {
  const name = "Alan";
  return (
    <button
      className={color != "" ? "btn btn-" + color : "btn btn-"}
      onClick={() => {
        handleSaludar(name);
      }}
    >
      Saludar
    </button>
  );
}

export default Button;
