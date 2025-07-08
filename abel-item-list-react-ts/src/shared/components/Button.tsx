interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  theme?: "primary" | "secondary" | "btn--icon";
  onClick?: () => void;
}

export default function Button({
  children,
  theme = "primary",
  disabled = false,
  type = "button",
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      type={type}
      className={`btn btn--${theme}`}
    >
      {children}
    </button>
  );
}
