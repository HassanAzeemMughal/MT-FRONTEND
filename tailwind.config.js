/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // new design color
        "bg-eerie-black": "#262626",
        "text-white": "#FFFFFF",
        "bg-black": "#080808",
        "bg-red": "#cb3f3f",
        "bg-blue": "#2996d8",
        // new design color
        "text-900": "#000000",
        "text-800": "#999999",
        "text-700": "#cc2121",
        "text-600": "#f8f8f8",
      },
    },
  },
  plugins: [],
};
