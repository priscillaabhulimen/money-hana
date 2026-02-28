export const fieldStyle = (hasError?: boolean) =>
  `focus:outline-none focus:ring-0 focus:border-primary bg-transparent border-b py-1.5 px-2.5 text-sm placeholder:text-foreground/25 ${
    hasError ? "border-red-500" : "border-border"
  }`;

export const buttonStyle = 'text-primary-foreground font-semibold bg-primary py-2 rounded-sm mt-10 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-40';