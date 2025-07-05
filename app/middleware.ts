// middleware.ts
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", 
  "/SignIn(.*)", 
  "/SignUp(.*)", 
  "/about"
]);

export default clerkMiddleware((auth, req) => {
  if (!isPublicRoute(req)) {
    auth.protect(); // 🔒 Protect all other routes
  }
});

export const config = {
  matcher: [
    // Matches all routes except static files and Next internals
    "/((?!_next|.*\\..*).*)",
    "/(api|trpc)(.*)",
  ],
};
