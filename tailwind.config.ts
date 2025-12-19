import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./client/index.html", "./client/src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        // Custom AAAI colors
        'aaai-blue': 'var(--aaai-blue)',
        'aaai-purple': 'var(--aaai-purple)',
        'aaai-cyan': 'var(--aaai-cyan)',
        'aaai-green': 'var(--aaai-green)',
        'aaai-orange': 'var(--aaai-orange)',
        'aaai-pink': 'var(--aaai-pink)',
        'aaai-indigo': 'var(--aaai-indigo)',
        'aaai-teal': 'var(--aaai-teal)',
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
        serif: ["var(--font-serif)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(135deg, var(--aaai-blue) 0%, var(--aaai-purple) 35%, var(--aaai-cyan) 100%)',
        'gradient-blue': 'linear-gradient(135deg, var(--aaai-blue), rgb(59, 130, 246))',
        'gradient-green': 'linear-gradient(135deg, rgb(34, 197, 94), rgb(22, 163, 74))',
        'gradient-purple': 'linear-gradient(135deg, var(--aaai-purple), rgb(147, 51, 234))',
        'gradient-pink': 'linear-gradient(135deg, var(--aaai-pink), rgb(236, 72, 153))',
        'gradient-indigo': 'linear-gradient(135deg, var(--aaai-indigo), rgb(99, 102, 241))',
        'gradient-teal': 'linear-gradient(135deg, var(--aaai-teal), rgb(20, 184, 166))',
        'gradient-orange': 'linear-gradient(135deg, var(--aaai-orange), rgb(249, 115, 22))',
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "fade-in": {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
