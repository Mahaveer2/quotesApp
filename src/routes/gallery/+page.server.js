import { PrismaClient } from "@prisma/client";

export async function load(){
  const client = new PrismaClient();
  let defaults = await client.site.findFirst({
    where:{
      id:1,
    }
  })

  const json = JSON.parse(defaults.data);
  const categoryId = json.galleryCategory;

  let data = await client.category.findUnique({
    where:{
      id:Number(categoryId)
    },
    include:{
      Quotes:true
    }
  })

  return {
    quotes:data.Quotes,
  }
}