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
        'ctp-rosewater': 'hsl(var(--color-ctp-rosewater) / <alpha-value>)',
        'ctp-flamingo': 'hsl(var(--color-ctp-flamingo) / <alpha-value>)',
        'ctp-pink': 'hsl(var(--color-ctp-pink) / <alpha-value>)',
        'ctp-mauve': 'hsl(var(--color-ctp-mauve) / <alpha-value>)',
        'ctp-red': 'hsl(var(--color-ctp-red) / <alpha-value>)',
        'ctp-maroon': 'hsl(var(--color-ctp-maroon) / <alpha-value>)',
        'ctp-peach': 'hsl(var(--color-ctp-peach) / <alpha-value>)',
        'ctp-yellow': 'hsl(var(--color-ctp-yellow) / <alpha-value>)',
        'ctp-green': 'hsl(var(--color-ctp-green) / <alpha-value>)',
        'ctp-teal': 'hsl(var(--color-ctp-teal) / <alpha-value>)',
        'ctp-sky': 'hsl(var(--color-ctp-sky) / <alpha-value>)',
        'ctp-sapphire': 'hsl(var(--color-ctp-sapphire) / <alpha-value>)',
        'ctp-blue': 'hsl(var(--color-ctp-blue) / <alpha-value>)',
        'ctp-lavender': 'hsl(var(--color-ctp-lavender) / <alpha-value>)',
        'ctp-text': 'hsl(var(--color-ctp-text) / <alpha-value>)',
        'ctp-subtext1': 'hsl(var(--color-ctp-subtext1) / <alpha-value>)',
        'ctp-subtext0': 'hsl(var(--color-ctp-subtext0) / <alpha-value>)',
        'ctp-overlay2': 'hsl(var(--color-ctp-overlay2) / <alpha-value>)',
        'ctp-overlay1': 'hsl(var(--color-ctp-overlay1) / <alpha-value>)',
        'ctp-overlay0': 'hsl(var(--color-ctp-overlay0) / <alpha-value>)',
        'ctp-surface2': 'hsl(var(--color-ctp-surface2) / <alpha-value>)',
        'ctp-surface1': 'hsl(var(--color-ctp-surface1) / <alpha-value>)',
        'ctp-surface0': 'hsl(var(--color-ctp-surface0) / <alpha-value>)',
        'ctp-base': 'hsl(var(--color-ctp-base) / <alpha-value>)',
        'ctp-mantle': 'hsl(var(--color-ctp-mantle) / <alpha-value>)',
        'ctp-crust': 'hsl(var(--color-ctp-crust) / <alpha-value>)',
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