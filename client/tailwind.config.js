/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        myshadow: "0px 0px 40px rgba(0, 255, 0, 0.3)",
      },
    },
  },
  plugins: [],
};
