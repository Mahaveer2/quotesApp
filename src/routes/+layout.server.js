import _, { map } from 'underscore';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export async function load({ params }) {
  let data = await prisma.quote.findMany({
    orderBy:[{views:'desc'}]
  })
  
  let defaults = await prisma.site.findFirst({
    where:{
      id:1,
    }
  })

  if(data.length > 10) {
    data.length = 10;
  }
  
  let quotes = await prisma.quote.findMany({
    where:{
      activated:true
    }
  })
  quotes = _.shuffle(quotes);
  
  return {
    quotes:quotes,
    data:data,
    settings:defaults,
  }
}