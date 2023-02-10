import { getBackgrounds,getAudio,getQuotes,getSiteSettings } from "$lib/functions";
import _, { map } from 'underscore';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function load({ params }) {
  let settings = await getSiteSettings();
  let quotes = await prisma.quote.findMany({
    where:{
      activated:true
    }
  })
  quotes = _.shuffle(quotes);
  
  return {
    settings:settings,
    quotes:quotes,
  }
}