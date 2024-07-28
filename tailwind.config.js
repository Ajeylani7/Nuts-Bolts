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
        background: "#FFFFFF",
        primaryButton: "#355AF9",
        secondaryButton: "#A4B4FF",
        imageCardBackground: "#EEEEEE",
        arrowButtonBackground: "#FFFFFF",
        infoCardBackground: "#0E1F6F",
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
