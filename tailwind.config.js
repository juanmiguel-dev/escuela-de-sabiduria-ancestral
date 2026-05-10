module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        title: "var(--font-title), serif",
        hand: "var(--font-hand), cursive"
      }
    }
  },
  plugins: []
};
