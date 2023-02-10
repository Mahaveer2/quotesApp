import client from '$lib/client';

export async function load({ params }) {
  let data = await client.quote.findMany({
    orderBy:[{views:'desc'}]
  })

  if(data.length > 10) {
    data.length = 10;
  }
  
  return {
    data:data,
  }
}