import { getBackgrounds,getAudio,getQuotes,getSiteSettings } from "$lib/functions";
import _, { map } from 'underscore';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function load({ params }) {
  let data = await getBackgrounds()
  let settings = await getSiteSettings();
  let quotes = await prisma.quote.findMany({
    where:{
      activated:true
    }
  })
  quotes = _.shuffle(quotes);
  let musicUrl= await getAudio();
  
  return {
    settings:settings,
    data:data,
    quotes:quotes,
    musicUrl:musicUrl,
  }
}