import Fuse from 'fuse.js';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';
import client from '$lib/client';

export const POST = async ({request}) => {
  const formData = await request.formData();
  
  if(isAdmin(formData.get("token"))){

    const res = await client.quote.deleteMany({
      where: {
        id:Number(formData.get("id")),
      },
    })
  return json({status:200});
  }

  return json({status:500})
  
};
