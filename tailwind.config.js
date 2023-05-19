/**
 * @type {import('@types/tailwindcss/tailwind-config').TailwindConfig}
 */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./src/**/*.{html,js,jsx}"
  ],
  plugins: [
    require("flowbite/plugin")
  ],
  theme: {},
  darkMode: 'class',
};