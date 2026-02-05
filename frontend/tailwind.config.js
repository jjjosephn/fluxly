/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pri: "#384254",
        sec: "#252a36",
        cta: "#2a78bb",
        "dark-cta": "#145369"
      },
    },
  },
  plugins: [],
}

