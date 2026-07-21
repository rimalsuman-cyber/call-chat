export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        ocean: '#0051d5',
        mist: '#f7f9fb',
        line: '#c6c6cd',
        navy: '#131b2e',
        panel: '#ffffff',
        chip: '#eceef0'
      },
      boxShadow: {
        soft: '0 10px 28px rgba(15, 23, 42, 0.10)',
        stitch: '0 2px 10px rgba(15, 23, 42, 0.08)'
      }
    },
  },
  plugins: [],
};
