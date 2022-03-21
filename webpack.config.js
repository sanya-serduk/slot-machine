const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { SourceMapDevToolPlugin, ProvidePlugin } = require("webpack")

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: './index.js',
	output: {
		filename: 'index.[contenthash].js',
		path: path.resolve(__dirname, 'dist'),
	},
	plugins: [
		new HTMLWebpackPlugin({
			template: "./index.html"
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, 'src/assets'),
					to: path.resolve(__dirname, 'dist/assets')
				}
			]
		}),
		new CleanWebpackPlugin(),
		new SourceMapDevToolPlugin(),
		new ProvidePlugin({ PIXI: 'pixi.js' })
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					"style-loader",
					{
						loader: "css-loader",
						options: {
							url: false
						},
					},
					"sass-loader"
				]
			}
		]
	}
}