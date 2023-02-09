import { error } from '@sveltejs/kit';
import { getQuote } from "$lib/functions";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let slug = params.quote;
  
  let data = await prisma.quote.findUnique({
    where:{
      id:Number(slug),
    },
    include:{
      category:true
    }
  })

  let categories = await prisma.category.findMany();

  if(!data){
    throw error(404, 'Not found');
  }

  return {
    quote:data,
    categories:categories
  };

}