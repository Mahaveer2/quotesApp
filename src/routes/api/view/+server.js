
import { PrismaClient } from '@prisma/client'
import Fuse from 'fuse.js';
import { getQuotes } from '$lib/functions';


const prisma = new PrismaClient() 

export const POST = async ({request}) => {

  const form = await request.json();
  const result = await prisma.quote.update({
    where: {
      id:form.id,
    },
    data: {
      views:{
        increment:1
      }
    },
  })
  

	return new Response("added view");
};
