
import Fuse from 'fuse.js';import { getQuotes } from '$lib/functions';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';

import client from '$lib/client';
export const POST = async ({request}) => {
  const formData = await request.formData();
  
  
  if(formData.get('token')){
    if(isAdmin(formData.get('token'))){
      const response = await client.quote.create({
        data:{
          email:formData.get('email'),
          activated:true,
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
      return json(response);
    }

  }else{
    const response = await client.quote.create({
      data:{
        email:formData.get('email'),
        activated:false,
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
    return json(response);
  }

}
