/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        warmGray: "#1E1E1E"
      }
    },
  },
  plugins: [
    "@tailwindcss/aspect-ratio",
    "@tailwindcss/custom-forms",
    "@tailwindcss/forms",
    "@tailwindcss/line-clamp",
    "@tailwindcss/typography",
    "tailwindcss-children"
  ],
}