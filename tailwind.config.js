/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow-reverse": "spin 10s linear reverse infinite",
        "finish-spin": "spin 1s cubic-bezier(0.4, 0, 0.2, 1) 1",
        "super-slomo": "spin 150s linear infinite",
      },
    },
  },
  plugins: [],
};
