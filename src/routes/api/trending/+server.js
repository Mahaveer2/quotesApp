import { PrismaClient } from "@prisma/client"
import { json } from "@sveltejs/kit";
import client from '$lib/client';

export const GET = async () => {

  let data = await client.quote.findMany({
    orderBy:[{views:'desc'}],
    take:10,
  })

  return json(data);
}