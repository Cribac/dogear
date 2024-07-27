import animate from "tailwindcss-animate"

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  safelist: ["dark"],
  prefix: "",
  
    content: [
      './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
    ],
  
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'ctp-text': 'rgb(var(--color-ctp-text) / <alpha-value>)',
        'ctp-base': 'rgb(var(--color-ctp-base) / <alpha-value>)',
        'ctp-rosewater': 'rgb(var(--color-ctp-rosewater) / <alpha-value>)',
        'ctp-flamingo': 'rgb(var(--color-ctp-flamingo) / <alpha-value>)',
        'ctp-pink': 'rgb(var(--color-ctp-pink) / <alpha-value>)',
        'ctp-mauve': 'rgb(var(--color-ctp-mauve) / <alpha-value>)',
        'ctp-red': 'rgb(var(--color-ctp-red) / <alpha-value>)',
        'ctp-maroon': 'rgb(var(--color-ctp-maroon) / <alpha-value>)',
        'ctp-peach': 'rgb(var(--color-ctp-peach) / <alpha-value>)',
        'ctp-yellow': 'rgb(var(--color-ctp-yellow) / <alpha-value>)',
        'ctp-green': 'rgb(var(--color-ctp-green) / <alpha-value>)',
        'ctp-teal': 'rgb(var(--color-ctp-teal) / <alpha-value>)',
        'ctp-sky': 'rgb(var(--color-ctp-sky) / <alpha-value>)',
        'ctp-sapphire': 'rgb(var(--color-ctp-sapphire) / <alpha-value>)',
        'ctp-blue': 'rgb(var(--color-ctp-blue) / <alpha-value>)',
        'ctp-lavender': 'rgb(var(--color-ctp-lavender) / <alpha-value>)',
        'ctp-subtext1': 'rgb(var(--color-ctp-subtext1) / <alpha-value>)',
        'ctp-subtext0': 'rgb(var(--color-ctp-subtext0) / <alpha-value>)',
        'ctp-overlay2': 'rgb(var(--color-ctp-overlay2) / <alpha-value>)',
        'ctp-overlay1': 'rgb(var(--color-ctp-overlay1) / <alpha-value>)',
        'ctp-overlay0': 'rgb(var(--color-ctp-overlay0) / <alpha-value>)',
        'ctp-surface2': 'rgb(var(--color-ctp-surface2) / <alpha-value>)',
        'ctp-surface1': 'rgb(var(--color-ctp-surface1) / <alpha-value>)',
        'ctp-surface0': 'rgb(var(--color-ctp-surface0) / <alpha-value>)',
        'ctp-mantle': 'rgb(var(--color-ctp-mantle) / <alpha-value>)',
        'ctp-crust': 'rgb(var(--color-ctp-crust) / <alpha-value>)',
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
      	xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        "collapsible-down": {
          from: { height: 0 },
          to: { height: 'var(--radix-collapsible-content-height)' },
        },
        "collapsible-up": {
          from: { height: 'var(--radix-collapsible-content-height)' },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "collapsible-down": "collapsible-down 0.2s ease-in-out",
        "collapsible-up": "collapsible-up 0.2s ease-in-out",
      },
    },
  },
  plugins: [animate],
}