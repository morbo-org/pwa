import fs from "fs";
import path from "path";

import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import WorkboxPlugin from "workbox-webpack-plugin";

function countRegularFiles(dir) {
  let count = 0;
  const subpaths = fs.readdirSync(dir, { recursive: true });
  for (const subpath of subpaths) {
    const fullPath = path.join(dir, subpath);
    const status = fs.statSync(fullPath);
    status.isFile() && count++;
  }
  return count;
}

export default (env, argv) => {
  const devMode = argv.mode === "development";
  const watchMode = env.WEBPACK_WATCH || false;

  const numberOfManifestAssets = countRegularFiles("./assets/resources/icons");

  return {
    entry: { index: "./src/index.tsx" },
    mode: "production",
    output: {
      clean: watchMode
        ? {
            keep: /(assets\/|manifest\..*\.webmanifest)/,
          }
        : true,
      filename: "[name].[contenthash].js",
      path: path.join(import.meta.dirname, "dist"),
      publicPath: "",
    },
    optimization: {
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            compress: {
              passes: 2,
            },
            format: {
              comments: false,
            },
          },
        }),
        new CssMinimizerPlugin(),
      ],
      runtimeChunk: "single",
      moduleIds: "deterministic",
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
            enforce: true,
          },
        },
      },
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
      symlinks: false,
    },
    devtool: devMode ? "source-map" : false,
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html",
        scriptLoading: "module",
      }),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
      }),
      new WorkboxPlugin.InjectManifest({
        exclude: [/\.map$/, /^assets\/icons\/.*\.png$/],
        swSrc: "./public/service-worker.ts",
      }),
      new webpack.DefinePlugin({
        DEV_MODE: devMode,
        NUMBER_OF_MANIFEST_ASSETS: numberOfManifestAssets,
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          include: [
            path.join(import.meta.dirname, "src"),
            path.join(import.meta.dirname, "public"),
          ],
          loader: "ts-loader",
        },
        {
          test: /\.css$/,
          include: path.join(import.meta.dirname, "src"),
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { modules: true } },
          ],
        },
        {
          test: /\.svg$/,
          include: path.join(import.meta.dirname, "assets", "inline", "icons"),
          issuer: /\.tsx$/,
          use: ["@svgr/webpack"],
        },
        {
          test: /\.png$/,
          include: path.join(import.meta.dirname, "assets", "resources", "icons"),
          type: "asset/resource",
          generator: {
            filename: "assets/icons/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.woff2$/,
          include: path.join(import.meta.dirname, "assets", "resources", "fonts"),
          type: "asset/resource",
          generator: {
            filename: "assets/fonts/[name].[contenthash][ext]",
          },
        },
        {
          test: /\.webmanifest$/,
          include: path.join(import.meta.dirname, "public"),
          loader: "webpack-webmanifest-loader",
          type: "asset/resource",
          generator: {
            filename: "[name].[contenthash][ext]",
          },
        },
        {
          test: /\.html$/,
          include: path.join(import.meta.dirname, "public"),
          loader: "html-loader",
        },
      ],
    },
  };
};
