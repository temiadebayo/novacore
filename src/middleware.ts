// Temporarily disabled for demo purposes
// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   function middleware() {
//     // Add any additional middleware logic here
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token,
//     },
//   }
// )

export default function middleware() {
  // No authentication required for demo
  return
}

export const config = {
  matcher: ["/dashboard/:path*"]
} 