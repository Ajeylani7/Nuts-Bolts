const { nextui } = require("@nextui-org/react");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["var(--font-nunito)"],
      },
      colors: {
        background: "#f7fcff",
        primary: "#10376a",
        secondary: "#b12e41",
        accent: "#dda5a6",
        "primary-button": "#10376a",
        "secondary-button": "#b12e41",
        text: "#374151",
        border: "#D1D5DB",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
