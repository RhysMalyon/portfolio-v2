/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./pages/**/*.{html,js,vue}', './components/**/*.{html,js,vue}'],
    theme: {
        extend: {
            colors: {
                'hj-blue': '#0055FF'
            }
        }
    },
    plugins: []
}
