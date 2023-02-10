import client from '$lib/client';

export async function load(){

  const categories= await client.category.findMany();
  return {
    categories
  }
}