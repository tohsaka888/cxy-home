import transpile from "next-transpile-modules";

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['42.200.211.25']
  },
  compiler: {
    styledComponents: true,
  },
};

const withTM = transpile(["three"]);

export default withTM(nextConfig);
