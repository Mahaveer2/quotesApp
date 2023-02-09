import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { getQuotes } from '$lib/functions';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';

const client = new PrismaClient();

export const POST = async ({request}) => {
  const formData = await request.formData();
  
  if(isAdmin(formData.get("token"))){

    const res = await client.category.delete({
      where: {
        id:Number(formData.get("id")),
      },
    })
  return json({status:200});
  }

  return json({status:500})
  
};
