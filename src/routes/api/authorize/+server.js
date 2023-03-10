import Fuse from 'fuse.js';
import moment from 'moment';
import client from '$lib/client';
import { json } from '@sveltejs/kit';

export const POST = async ({request}) => {
  const formData = await request.formData();

  const response = await client.loginSession.findUnique({
    where:{
      token:formData.get('token'),
    }
  })

  if(!response){
    return new Response(JSON.stringify({admin:false,status:500,message:"Invalid Token"}));
  }
  if(response.date > response.expires){
    return new Response(JSON.stringify({admin:true,status:500,message:"Invalid Token"}));
    const deleteUser = await client.loginSession.delete({
      where: {
        token: formData.get('token'),
      },
    })
  }

    const user = await client.admin.findUnique({
      where:{
        id: Number(response.adminId)
      }
    })
    return new Response(JSON.stringify({admin:true,status:200,email:user.email}));
	
};


export const DELETE = async ({request}) => {
  const formData = await request.formData();

  const response = await client.loginSession.findUnique({
    where:{
      token:formData.get('token'),
    }
  })

  if(response){
    let del = await client.loginSession.delete({
      where:{
        token:formData.get('token'),
      }
    })

    return json({status:200})
  }
    return new Response(JSON.stringify({admin:true,status:200,email:user.email}));
	
};

 