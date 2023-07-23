module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        "auto-fill" : "repeat(auto-fit, minmax(250px, 1fr))",
        "dashboard-menu" : "repeat(auto-fit, minmax(200px, 1fr))",
        "client-home" : "repeat(auto-fit, minmax(200px, 1fr))",
      },
      width: {
        "14": "14%"
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
}