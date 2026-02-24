export const fieldStyle = (hasError?: boolean) => 
  `focus:outline-none focus:border focus:border-[#2020a3] bg-[#2020a3]/8 py-1.5 px-2.5 text-md rounded-sm border ${
    hasError ? "border-red-500" : "border-transparent"
  }`;
export const buttonStyle = (isActive?: boolean) => `text-white font-semibold ${isActive ? 'bg-[#2020a3]' : 'bg-[#2020a3]/30'} py-2 rounded-sm mt-10`;