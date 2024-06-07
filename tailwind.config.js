/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [ 
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    screens: {
      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }    
    },
    extend: {
    fontFamily: {
      roboto:["Roboto", "sans-serif"],
         },
       },
     },
  plugins: [],
}
