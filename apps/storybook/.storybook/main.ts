import type { StorybookConfig } from "@storybook/react-webpack5";
import TsconfigPathsPlugin from "tsconfig-paths-webpack-plugin";

const config: StorybookConfig = {
  stories: [
    "../components/**/*.mdx",
    "../components/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-docs",
    "@storybook/addon-themes",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (storybookConfig) => {
    // 1) Ensure resolve.extensions contains .ts and .tsx:
    if (storybookConfig.resolve) {
      storybookConfig.resolve.extensions = [
        // keep any existing extensions (e.g. .js, .jsx)
        ...(storybookConfig.resolve.extensions || []),
        ".ts",
        ".tsx",
      ];

      // 2) Add tsconfig-paths plugin so “@/…” aliases work:
      storybookConfig.resolve.plugins = [
        ...(storybookConfig.resolve.plugins || []),
        new TsconfigPathsPlugin({
          configFile: "./tsconfig.json",
          extensions: [".ts", ".tsx", ".js", ".jsx"],
        }),
      ];
    }

    // 3) Add a rule that runs .ts/.tsx through babel-loader (with @babel/preset-typescript):
    if (storybookConfig.module && storybookConfig.module.rules) {
      storybookConfig.module.rules.push({
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              // make sure you have these packages installed in your storybook project:
              //   @babel/core, babel-loader, @babel/preset-env,
              //   @babel/preset-react, @babel/preset-typescript
              presets: [
                require.resolve("@babel/preset-env"),
                [
                  require.resolve("@babel/preset-react"),
                  { runtime: "automatic" },
                ],
                require.resolve("@babel/preset-typescript"),
              ],
              // If you have any custom plugins (e.g. class-properties), add them here:
              // plugins: [ /* … */ ],
            },
          },
        ],
      });
    }

    return storybookConfig;
  },
};
export default config;


