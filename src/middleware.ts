import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/queue/:path*",
    "/analytics/:path*",
    "/insights/:path*",
    "/schedule/:path*",
    "/settings/:path*"
  ],
};
