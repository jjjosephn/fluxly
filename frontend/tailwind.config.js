/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pri: "#252a36",
        sec: "#303948",
        cta: "#2a78bb",
      },
    },
  },
  plugins: [],
}

