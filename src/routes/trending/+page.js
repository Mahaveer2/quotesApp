import { trendingPosts } from "$lib/functions";

export async function load({ params }) {
  let data =  trendingPosts()
  
  return {
    data:data,
  }
}