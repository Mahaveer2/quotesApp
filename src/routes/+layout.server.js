import _, { map } from 'underscore';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function load({ params }) {
  let data = await prisma.quote.findMany({
    orderBy:[{views:'desc'}]
  })
  let quotes;
  
  let defaults = await prisma.site.findFirst({
    where:{
      id:1,
    }
  })

  const json = JSON.parse(defaults.data);
  const categoryId = json.galleryCategory;
  const homeId = json.homeCategory;

  if(data.length > 10) {
    data.length = 10;
  }

  let category = await prisma.category.findFirst({
    where:{
      id:Number(homeId),
    },
    include:{
      Quotes:true,
    }
  })
  quotes = _.shuffle(category.Quotes);
  
  return {
    quotes:quotes,
    data:data,
    settings:defaults,
  }
}