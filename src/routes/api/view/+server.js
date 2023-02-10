
import client from "$lib/client";;
import Fuse from 'fuse.js';

export const POST = async ({request}) => {

  const form = await request.json();
  const result = await client.quote.update({
    where: {
      id:form.id,
    },
    data: {
      views:{
        increment:1
      }
    },
  })
  

	return new Response("added view");
};
