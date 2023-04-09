import { env } from "env.mjs";

async function fetchQuery(path:string, queryParams?:string) {
  let url
  if (queryParams !== null) {
    
    url = `${env.NEXT_PUBLIC_BACKEND_URL}/api/${path}?${queryParams}`
  } else {
    url = `${env.NEXT_PUBLIC_BACKEND_URL}/${path}`
  }
  const response = await fetch(`${url}`,{ method: "GET", headers:{'Authorization':`${env.NEXT_PUBLIC_BACKEND_TOKEN}`, "Content-type": "application/json;charset=UTF-8"},})
  const data  = await response.json()
  return data
}

export { fetchQuery }