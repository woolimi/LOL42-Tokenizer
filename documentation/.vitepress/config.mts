import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "LOL42",
  description: "LOL42 Documentation",
  base: "/LOL42-Tokenizer/",
  outDir: "./../github-pages",
  themeConfig: {
    sidebar: [
      { text: "Introduction", link: "/" },
      { text: "Metadata", link: "/metadata" },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/woolimi/LOL42-Tokenizer" }],
  },
});
