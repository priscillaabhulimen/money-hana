export const fieldStyle = (hasError?: boolean) =>
  `focus:outline-none focus:ring-0 focus:border-primary bg-foreground/2.5 py-2 px-2.5 text-sm rounded-sm border placeholder:text-foreground/20 ${
    hasError ? "border-red-500" : "border-transparent focus:border-primary"
  }`;

export const buttonStyle = 'text-primary-foreground font-semibold bg-primary py-2 rounded-sm mt-10 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:opacity-40';