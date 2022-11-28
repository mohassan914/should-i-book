export function onRequest(context) {
  return new Response(`Hello, world! My API key is ${context.env.API_KEY}`)
}

