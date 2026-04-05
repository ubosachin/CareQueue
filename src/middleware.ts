export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/queue/:path*", "/analytics/:path*", "/insights/:path*", "/schedule/:path*", "/settings/:path*"],
};
