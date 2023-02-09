import { trendingPosts } from "$lib/functions";
import { PrismaClient } from "@prisma/client";

export async function load({ params }) {
  const client = new PrismaClient();
  let data = await client.quote.findMany({
    orderBy:[{views:'desc'}]
  })

  if(data.length > 10) {
    data.length = 10;
  }
  
  return {
    data:data,
  }
}