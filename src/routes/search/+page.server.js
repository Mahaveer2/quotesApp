import { getQuotes,getCategories } from "$lib/functions";
import { PrismaClient } from "@prisma/client";

export async function load({ params }) {
  const client = new PrismaClient();
  let categories = await client.category.findMany();
  let data =  await client.quote.findMany({
    where:{
      activated:true
    }
  })

  return {
    data:data,
    categories:categories,
  }
}
