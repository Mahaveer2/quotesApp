import { PrismaClient } from "@prisma/client";

export async function load(){
  const client = new PrismaClient();  

  const categories= await client.category.findMany();
  return {
    categories
  }
}