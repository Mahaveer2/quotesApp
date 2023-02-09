import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { getQuotes } from '$lib/functions';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';

const client = new PrismaClient();
export const POST = async ({request}) => {
  const formData = await request.formData();
  if(isAdmin(formData.get('token'))){

    const category = await client.category.findUnique({
      where:{
        slug: formData.get('slug')
      }
    })

    if(category){
      return json({success:false,msg:"Slug Already taken" })
    }

    const response = await client.category.create({
      data:{
        title:formData.get('title'),
        slug:formData.get('slug')
      }
    })
    return json({success:true,msg:"Created category"});

}
}