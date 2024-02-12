/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      Keyframes: {
        rollout: {
          "0%": { transform: 'translateY(100%)' },
          "100%": { transform: 'translateY(0)' }
        },
        rollin: {
          "0%": { transform: 'translateY(0)' },
          "100%": { transform: 'translateY(100%)' }
        }
      },
      animation: {
        rollout: 'rollout 1s ease-in-out 1',
        rollin: 'rollin 1s ease-in-out 1'
      },
    },
    screens:{
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      // 'ml': '968px',
      // => @media (min-width: 968px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
      lgscreen: {'max': '968px'},
      midscreen: {'max': '768px'},
      maxscreen: {'max': '640px'},
      maxmobile: {'max': '580px'},
      mobile: {'max': '480px'},
      midmobile: {'max': '380px'},
      minmobile: {'max': '280px'}
    }
  },
  plugins: [],
}
