import { getQuotes } from "$lib/functions";

export async function load({ params }) {
  let data =  getQuotes()
  
  return {
    data:data,
  }
}