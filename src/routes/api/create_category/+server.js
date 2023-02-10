import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';
import client from '$lib/client';

export const POST = async ({request}) => {
  const formData = await request.formData();
  if(isAdmin(formData.get('token'))){

    const response = await client.category.create({
      data:{
        title:formData.get('title'),
        slug:crypto.randomUUID()
      }
    })
    return json({success:true,msg:"Created category"});

}
}