import client from '$lib/client';

export async function load(){
  let data = await client.site.findFirst();
  let settings = JSON.parse(data.data);

  return data;
}