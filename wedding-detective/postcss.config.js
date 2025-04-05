export default {
  plugins: {
    '@tailwindcss/postcss': {}, // Updated to use @tailwindcss/postcss instead of tailwindcss
    autoprefixer: {
      flexbox: 'no-2009',
      grid: true,
      add: true,
      remove: false
    },
    'postcss-preset-env': {
      stage: 1,
      features: {
        'color-function': true,
        'nesting-rules': true,
        'custom-media-queries': true
      },
      browsers: [
        '>0.3%',
        'not dead',
        'not op_mini all',
        'not Safari < 10',
        'not Chrome < 60'
      ]
    }
  }
}