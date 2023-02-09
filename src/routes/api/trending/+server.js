import { PrismaClient } from "@prisma/client"
import { json } from "@sveltejs/kit";

export const GET = async () => {
  const client = new PrismaClient();

  let data = await client.quote.findMany({
    orderBy:[{views:'desc'}],
    take:10,
  })

  return json(data);
}