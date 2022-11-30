export function onRequest(context) {
  
  return new Response(`Hello, world! This content came back ${context.env.API_KEY} from a serverless function.`) // My API weather map key is ${context.env.API_KEY}`)
}

