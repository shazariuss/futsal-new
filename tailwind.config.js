/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#faf5ff",
                    100: "#f3e8ff",
                    200: "#e9d5ff",
                    300: "#d8b4fe",
                    400: "#c084fc",
                    500: "#a855f7",
                    600: "#9333ea",
                    700: "#7c3aed",
                    800: "#6b46c1",
                    900: "#581c87",
                    950: "#3b0764",
                },
                secondary: {
                    50: "#ecfdf5",
                    100: "#d1fae5",
                    200: "#a7f3d0",
                    300: "#6ee7b7",
                    400: "#34d399",
                    500: "#10b981",
                    600: "#059669",
                    700: "#047857",
                    800: "#065f46",
                    900: "#064e3b",
                    950: "#022c22",
                },
                cyan: {
                    50: "#ecfeff",
                    100: "#cffafe",
                    200: "#a5f3fc",
                    300: "#67e8f9",
                    400: "#22d3ee",
                    500: "#06b6d4",
                    600: "#0891b2",
                    700: "#0e7490",
                    800: "#155e75",
                    900: "#164e63",
                    950: "#083344",
                },
            },
            backgroundImage: {
                "gradient-purple":
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                "gradient-cyan":
                    "linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)",
                "gradient-main":
                    "linear-gradient(135deg, #6b46c1 0%, #9333ea 50%, #06b6d4 100%)",
                glass: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            },
            backdropBlur: {
                xs: "2px",
            },
            animation: {
                float: "float 6s ease-in-out infinite",
                "float-delayed": "float 6s ease-in-out infinite 2s",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
                    "50%": { transform: "translateY(-20px) rotate(180deg)" },
                },
            },
        },
    },
    plugins: [],
};
