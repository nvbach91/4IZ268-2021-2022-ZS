import cn from "classnames";

const Button = ({ children, className, onClick }) => (
  <button
    className={cn(className, "px-4 py-2 text-white rounded-lg")}
    onClick={onClick}
  >
    {children}
  </button>
);

export default Button;
