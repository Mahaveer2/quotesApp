import { trendingPosts } from "$lib/functions";

export async function load({ params }) {
  let data = await trendingPosts()

  if(data.length > 10) {
    data.length = 10;
  }
  
  return {
    data:data,
  }
}