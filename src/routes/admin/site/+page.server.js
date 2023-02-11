import { error } from '@sveltejs/kit';
import client from "$lib/client"

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let slug = params.quote;

  let categories = await client.category.findMany();
  let defaults = await client.site.findFirst({
    where:{
      id:1,
    }
  })

  return {
    categories:categories,
    defaults:defaults
  };

}