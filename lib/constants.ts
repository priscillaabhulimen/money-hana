export const fieldStyle = (hasError?: boolean) => 
  `focus:outline-none focus:border focus:border-[#1919bc] bg-[#1919bc]/8 py-1.5 px-2.5 text-md rounded-sm border ${
    hasError ? "border-red-500" : "border-transparent"
  }`;
export const buttonStyle = (isActive?: boolean) => `text-white font-semibold ${isActive ? 'bg-[#1919bc]' : 'bg-[#1919bc]/30'} py-2 rounded-sm mt-10 cursor-pointer`;