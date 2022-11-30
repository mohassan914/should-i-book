export function onRequest(context) {
  return new Response(`Hello, world! My API weather map key is ${context.env.API_KEY}`)
}

