/** @type {import('next').NextConfig} */
export default {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
    dangerouslyAllowSVG: true,
  },
};
