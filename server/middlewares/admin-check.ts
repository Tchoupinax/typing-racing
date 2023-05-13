import { H3Event, getHeaders } from 'h3'

export function checkAdminAllowance(
  request: H3Event,
  handler: () => {}
) {
  const { authorization } = getHeaders(request)
  if (!authorization || authorization !== process.env.ADMIN_SECRET) {
    return createError({ statusCode: 401, statusMessage: "UNAUTHORIZED" })
  }

  return handler();
}
