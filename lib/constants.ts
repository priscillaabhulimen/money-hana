export const fieldStyle = (hasError?: boolean) => 
  `focus:outline-none focus:border focus:border-primary bg-primary/8 py-1.5 px-2.5 text-md rounded-sm border ${
    hasError ? "border-red-500" : "border-transparent"
  }`;
export const buttonStyle = 'text-background font-semibold bg-primary py-2 rounded-sm mt-10 cursor-pointer transition-colors disabled:cursor-not-allowed disabled:bg-primary/30';