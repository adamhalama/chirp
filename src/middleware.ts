import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    // allowing all routes to be accessed publicly, private procedures on the posting on the API, everything else is public
    "/(.*)",
  ],

});

export const config = {
  // Protects all routes, including api/trpc.
  // See https://clerk.com/docs/references/nextjs/auth-middleware
  // for more information about configuring your Middleware
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/(api|trpc)(.*)"
  ],
};