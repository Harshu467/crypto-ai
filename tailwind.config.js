/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      
      colors: {
        gray: { 100: "#808080", 200: "#323232", 300: "#212121" },
        white: "#fff",
        cyan: "#14ffec",
        red: "#d6436e",
        green: "#25da72",
      },
      fontSize: {
        sm: "14px",
        md: "18px",
        lg: "24px",
        xl: "32px",
        base: "16px",
      },
    },
  },
  plugins: [],
};
