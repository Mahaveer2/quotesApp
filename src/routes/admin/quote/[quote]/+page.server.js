import { error } from '@sveltejs/kit';
import client from "$lib/client"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let slug = params.quote;
  
  let data = await client.quote.findUnique({
    where:{
      id:Number(slug),
    },
    include:{
      category:true
    }
  })

  let categories = await client.category.findMany();

  if(!data){
    throw error(404, 'Not found');
  }

  return {
    quote:data,
    categories:categories
  };

}