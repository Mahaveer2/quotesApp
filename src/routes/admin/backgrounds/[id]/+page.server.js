import { error } from '@sveltejs/kit';
import client from "$lib/client"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let id = params.id;
  
  let data = await client.backgrounds.findUnique({
    where:{
      id:Number(id),
    }
  })


  if(!data){
    throw error(404, 'Not found');
  }

  return {
    img:data,
    id:id,
  };

}