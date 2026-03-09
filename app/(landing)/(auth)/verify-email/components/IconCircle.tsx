interface IconCircleProps {
  children: React.ReactNode;
  variant?: "primary" | "red" | "green";
  pulse?: boolean;
}

const variantStyles = {
  primary: "bg-primary/10",
  red: "bg-red-500/10",
  green: "bg-green-500/10",
};

export function IconCircle({ children, variant = "primary", pulse }: IconCircleProps) {
  return (
    <div className={`w-16 h-16 rounded-full flex items-center justify-center ${variantStyles[variant]} ${pulse ? "animate-pulse" : ""}`}>
      {children}
    </div>
  );
}