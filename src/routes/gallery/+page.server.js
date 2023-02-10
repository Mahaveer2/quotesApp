import { PrismaClient } from "@prisma/client";

export async function load(){
  const client = new PrismaClient();
  let text = '';
  let data = await client.quote.findMany({
    orderBy:[{views:'desc'}],
    take:50
  })

  data.forEach(e => {
    text += e.Author + " ";
    text += e.quote + " ";
  })
  return {
    text:text,
  }
}