import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // ----- Brand palette (ver brand-notes.md) -----
        wine: {
          DEFAULT: "#5B0E14", // vinho tinto profundo
          50: "#FBEDED",
          100: "#F3D2D3",
          200: "#E2999B",
          300: "#CF6064",
          400: "#A93138",
          500: "#7B1E2B", // bordô
          600: "#5B0E14",
          700: "#430A0F",
          800: "#2C070A",
          900: "#1A0406",
        },
        gold: {
          DEFAULT: "#C9A24B", // dourado / champagne
          soft: "#E6C97A",
          deep: "#A07E33",
        },
        cork: "#A9744F", // rolha / madeira
        stone: "#6F6257",
        // Brilho de ambiente do espaço real (iluminação LED magenta/violeta)
        glow: {
          magenta: "#A8326B",
          violet: "#5C2A66",
          rose: "#C45B8C",
        },
        cream: {
          DEFAULT: "#F7F1E8", // branco quente
          deep: "#EFE6D6",
        },
        ink: "#120A0C", // preto profundo

        // shadcn/ui semantic tokens (mapeados em globals.css)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        // Wordmark art-deco (inspirado no logótipo real da Ponto Wine)
        display: ["var(--font-poiret)", "var(--font-fraunces)", "serif"],
      },
      backgroundImage: {
        "paper-texture":
          "radial-gradient(circle at 20% 20%, rgba(201,162,75,0.05) 0, transparent 45%), radial-gradient(circle at 80% 0%, rgba(123,30,43,0.08) 0, transparent 50%)",
        "gold-sheen":
          "linear-gradient(110deg, #A07E33 0%, #E6C97A 45%, #C9A24B 55%, #A07E33 100%)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "cork-pop": {
          "0%": { transform: "translateY(0) rotate(0)" },
          "40%": { transform: "translateY(-14px) rotate(-8deg)" },
          "100%": { transform: "translateY(0) rotate(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.6s ease-out both",
        shimmer: "shimmer 6s linear infinite",
        "cork-pop": "cork-pop 0.6s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
