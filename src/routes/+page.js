import { getQuotes } from "$lib/functions";

export async function load({ params }) {
  let data = await getQuotes()
  
  return {
    data:data,
  }
}