import formsPlugin from '@tailwindcss/forms';
import prelinePlugin from 'preline/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.{ts,jsx,tsx}',
    './node_modules/preline/dist/*.js',
  ],
  darkMode: 'class',
  plugins: [
    formsPlugin,
    prelinePlugin,
  ],
}