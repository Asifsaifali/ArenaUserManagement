// prettier.config.mjs
import { tailwindPlugin } from "prettier-plugin-tailwindcss";

export default {
  plugins: [tailwindPlugin],
  tailwindConfig: "./tailwind.config.cjs",
};
