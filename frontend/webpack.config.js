/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prefer-object-spread */
/* eslint-disable object-shorthand */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const templatePath = './public/index.html';
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
	const isEnvProduction = env.production;
	const envFilePath = isEnvProduction ? './.env' : './.env.development';
	return {
		mode: 'development',
		entry: './src/index.tsx',
		devtool: 'inline-source-map',
		devServer: {
			static: './build',
			historyApiFallback: true
		},
		plugins: [
			new HtmlWebpackPlugin(
				Object.assign(
					{},
					{
						inject: true,
						template: templatePath,
						process: process
					},
					isEnvProduction && {
						minify: {
							removeComments: true,
							collapseWhitespace: true,
							removeRedundantAttributes: true,
							useShortDoctype: true,
							removeEmptyAttributes: true,
							removeStyleLinkTypeAttributes: true,
							keepClosingSlash: true,
							minifyJS: true,
							minifyCSS: true,
							minifyURLs: true
						}
					}
				)
			),
			new webpack.ProvidePlugin({
				process: 'process/browser'
			}),
			new Dotenv({ path: envFilePath })
		],
		output: {
			filename: '[name].[contenthash].js',
			path: path.resolve(__dirname, 'build'),
			clean: true,
			publicPath: '/'
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: 'ts-loader',
					exclude: /node_modules/
				},
				{
					test: /\.(css|s(a|c)ss)$/i,
					use: ['style-loader', 'css-loader', 'sass-loader']
				},
				{
					test: /\.(png|jpg|jpeg|gif)$/i,
					type: 'asset/resource'
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/i,
					type: 'asset/resource'
				},
				{
					test: /\.(svg)$/i,
					issuer: /\.[jt]sx?$/,
					use: [{ loader: '@svgr/webpack', options: { dimensions: false } }]
				},
				{
					test: /\.(png|jpg|gif)$/i,
					use: [
						{
							loader: 'url-loader',
							options: {
								limit: false
							}
						}
					]
				},
				{
					test: /\.(png|jpe?g|gif)$/i,
					loader: 'file-loader',
					options: {
						publicPath: '/assets/images/',
						outputPath: '../images/'
					}
				}
			]
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js']
		}
	};
};
