import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let slug = params.category;
  
  let data = await prisma.category.findUnique({
    where:{
      id:Number(slug)
    },
    include:{
      Quotes:true
    }
  })

  if(!data){
    throw error(404, 'Not found');
  }

  return {
    quote:data,
		title:data.title,
  } 

}