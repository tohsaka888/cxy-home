import transpile from "next-transpile-modules";

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
};

const withTM = transpile(["three"]);

export default withTM(nextConfig);
