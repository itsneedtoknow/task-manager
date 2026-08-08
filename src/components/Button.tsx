import styles from "./Button.module.css";
interface Button {
  className?: string;
  type?: "submit" | "reset" | "button";
  children: React.ReactNode;
  id?: string;
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
}
export function Button({
  className,
  type = "button",
  children,
  id,
  title,
  onClick,
}: Button) {
  return (
    <button
      type={type}
      id={id}
      title={title}
      onClick={onClick}
      className={`${styles.btn} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
