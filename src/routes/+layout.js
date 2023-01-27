import { getBackgrounds } from "$lib/functions";

export async function load({ params }) {
  let data =  getBackgrounds()
  
  return {
    data:data,
  }
}