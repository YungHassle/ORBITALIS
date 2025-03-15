module.exports = {
	reactStrictMode: true,
	images: {
		disableStaticImages: true,
	},

	webpack: (config, {isServer}) => {
		config.module.rules.push({
			test: /\.(png|jpg|gif)$/i,
			use: "url-loader",
		})
		config.module.rules.push({
			test: /\.svg$/i,
			use: {
				loader: "svg-inline-loader",
			},
		})

		return config
	},
}
