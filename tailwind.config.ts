import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Source Code Pro"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        ds: {
          primaryFill: "#1F2228",
          secondaryFill: "#24272E",
          accentFill: "#2E323B", // #8C97B0 (headingGray) * 0.1 opacity
          buttonGrayFill: "#373D4A",
          buttonBlueFill: "#2E68FF",
          buttonBlueShadow: "#0338C2",
          iconDarkBlueFill: "#2B354F",
          blueMain: "#2E68FF",
          greenMain: "#31482B", //??? === 65CD1F (greenAccent) * 0.2 opacity??
          greenAccent: "#65CD1F",
          headingRed: "#E85C4F",
          headingGray: "#8C97B0",
          progressbarFill: "#717888",
          codeFill: "#1B1E23",
          codeLineNumber: "#373D4A",
          codeActiveLineNumber: "#fff",
          codeRed: "#DF635B",
          codeBrown: "#C0945D",
          codeGray: "#8C97B0",
          tabIconBlue: "#2862E9",
          tabIconRed: "#E46C4D",
          tabIconDark: "#28282B",
          activeTabFill: "#2D3139",
          inactiveTabFill: "#1B1E23",
        },
      },
    },
  },
  plugins: [],
};
