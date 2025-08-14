// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': 'hsl(180, 100%, 50%)',
        'neon-purple': 'hsl(262, 83%, 70%)',
        'neon-green': 'hsl(120, 100%, 50%)',
        'neon-pink': 'hsl(330, 100%, 70%)',
        'neon-orange': 'hsl(30, 100%, 60%)',
      },
      backgroundImage: {
        'gradient-neon': 'linear-gradient(135deg, hsl(180, 100%, 50%), hsl(262, 83%, 70%))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 5px hsl(180, 100%, 50%, 0.5)' },
          '50%': { boxShadow: '0 0 20px hsl(180, 100%, 50%, 0.8), 0 0 30px hsl(180, 100%, 50%, 0.3)' },
        },
      }
    },
  },
  plugins: [],
};
