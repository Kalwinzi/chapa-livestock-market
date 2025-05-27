import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'system-ui', 'sans-serif'],
				heading: ['Poppins', 'system-ui', 'sans-serif'],
			},
			colors: {
				// Modern ChapaMarket Color Scheme
				primary: {
					DEFAULT: '#3B7C2A',
					50: '#F0F8ED',
					100: '#DCF0D4',
					200: '#BBE1AE',
					300: '#94CF7D',
					400: '#6FB84C',
					500: '#3B7C2A',
					600: '#2F6321',
					700: '#254A1A',
					800: '#1E3A15',
					900: '#1A3213',
					950: '#0D1A09',
				},
				accent: {
					DEFAULT: '#FFB703',
					50: '#FFF9E6',
					100: '#FFF2CC',
					200: '#FFE699',
					300: '#FFD966',
					400: '#FFCC33',
					500: '#FFB703',
					600: '#E6A300',
					700: '#CC9200',
					800: '#B38200',
					900: '#997100',
				},
				background: '#F5F5F5',
				surface: '#FFFFFF',
				text: {
					primary: '#1F2937',
					secondary: '#6B7280',
					muted: '#9CA3AF',
				},
				// Keep existing shadcn colors for compatibility
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				foreground: 'hsl(var(--foreground))',
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			fontSize: {
				'h1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }], // 36px
				'h2': ['1.75rem', { lineHeight: '2rem', fontWeight: '600' }],   // 28px
				'h3': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],    // 24px
				'body': ['1rem', { lineHeight: '1.6' }],                       // 16px
				'body-lg': ['1.125rem', { lineHeight: '1.7' }],                // 18px
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '6px'
			},
			boxShadow: {
				'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
				'hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
				'card': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
			},
			keyframes: {
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(20px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'slide-up': {
					'0%': { opacity: '0', transform: 'translateY(30px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					'0%': { opacity: '0', transform: 'scale(0.95)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'count-up': {
					'0%': { opacity: '0', transform: 'scale(0.5)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'float': 'float 3s ease-in-out infinite',
				'count-up': 'count-up 0.6s ease-out',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
