import middleware from "next-auth/middleware";
export default middleware

export const config = {
  //  *: zero or mote params
  //  +: one ore more params
  //  ?: zero or one param
  matcher: [
    '/dashboard/:path*'
  ]
}