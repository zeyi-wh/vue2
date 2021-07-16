module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  {{#if_eq projectType "normal"}}
  plugins: [
    [
      "import",
      { libraryName: "ant-design-vue", libraryDirectory: "es", style: true },
    ],
  ],
  {{/if_eq}}
};
