/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "raw.githubusercontent.com",
				port: "",
				pathname: "/gitdagray/test-blogposts/main/images/**",
			},
		],
	},
};

module.exports = nextConfig;
