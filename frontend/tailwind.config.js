/** @type {import('tailwindcss').Config} */
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import daisyui from "daisyui";
const flowbite = require("flowbite-react/tailwind");
export default {
  content: ["./src/**/*.{html,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [daisyui, flowbite.plugin()],
};
