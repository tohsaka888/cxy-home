import transpile from "next-transpile-modules";

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  staticPageGenerationTimeout: 60000,
  images: {
    domains: ['42.200.211.25']
  },
  compiler: {
    styledComponents: true,
  },
};

const withTM = transpile(["three"]);

export default withTM(nextConfig);
