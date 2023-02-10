import client from '$lib/client';

export async function load({ params }) {
  let categories = await client.category.findMany();
  let data =  await client.quote.findMany({
    where:{
      activated:true
    }
  })

  return {
    data:data,
    categories:categories,
  }
}
