const dotenv = require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
console.log(dotenv);

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: dotenv.parsed,
};

module.exports = nextConfig;
