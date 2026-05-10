module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        title: "var(--font-caveat), serif",
        caveat: "var(--font-caveat), serif"
      }
    }
  },
  plugins: []
};
