// webpack.mix.js

let mix = require("laravel-mix");

mix
  .js("res/js/app.js", "public/js/app.js")
  .sass("res/scss/app.scss", "public/css/app.css");
