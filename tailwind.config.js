module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        hand: "var(--font-hand)",
        title: "var(--font-hand)"
      }
    }
  },
  plugins: []
};
