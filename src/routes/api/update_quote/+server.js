import Fuse from 'fuse.js';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';
import client from '$lib/client';

export const POST = async ({request}) => {
  const formData = await request.formData();
  
  if(isAdmin(formData.get("token"))){

  const response = await client.quote.update({
    where:{
      id:Number(formData.get("id")),
    },
    data:{
      email:formData.get('email'),
      activated:(formData.get('activated') == 'true') ? true : false,
      name:formData.get('name'),
      Author:formData.get('author'),
      quote:formData.get('quote'),
      description:formData.get('description'),
      category:{
        set:[],
      }
    }
  }) 
  const createResponse = await client.quote.update({
    where:{
      id:Number(formData.get("id")),
    },
    data:{
      email:formData.get('email'),
      activated:(formData.get('activated') == 'true') ? true : false,
      name:formData.get('name'),
      Author:formData.get('author'),
      quote:formData.get('quote'),
      description:formData.get('description'),
      category:{
        connect:{
          id:Number(formData.get('categoryid'))
        }
      }
    }
  }) 
  return json({status:200});
  }

  return json({status:500})
  
};
