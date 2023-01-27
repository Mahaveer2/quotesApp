import { error } from '@sveltejs/kit';
import { getQuote } from "$lib/functions";

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let slug = params.quote;
  let data = await getQuote(slug);

  console.log(data)

  if(data.length){
    return {
      quote:data
    };
  }else{
    throw error(404, 'Not found');
  }

}