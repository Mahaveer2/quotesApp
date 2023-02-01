import { error } from '@sveltejs/kit';
import { getQuote } from "$lib/functions";
import { getCategories } from '../../lib/functions';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let data = await getCategories();


  if(data.length){
    return {
      data
    };
  }else{
    throw error(404, 'Not found');
  }

}