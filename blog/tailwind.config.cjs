module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#06b6d4", // teal-cyan
          indigo: "#6366f1", // indigo for accents
        },
        app: {
          bg: "#071025",
          card: "#071426",
          muted: "#94a3b8",
          text: "#e6eef8",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
        ],
      },
    },
  },
  plugins: [],
};
