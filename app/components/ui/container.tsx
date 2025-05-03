import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  size?: "default" | "small" | "large";
}

export function Container({
  children,
  className,
  size = "default",
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        {
          "max-w-screen-2xl": size === "large",
          "max-w-7xl": size === "default",
          "max-w-4xl": size === "small",
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
} 