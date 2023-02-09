import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { getQuotes } from '$lib/functions';
import moment from 'moment';
const client = new PrismaClient();

export const POST = async ({request}) => {
  const formData = await request.formData();
  const expiry = moment().add(7, "days").toDate();

  const response = await client.admin.findUnique({
    where:{
      email:formData.get('email'),
    }
  })


  if(response.password === formData.get('password')){
    let token = crypto.randomUUID();
    let res = await client.loginSession.create({
      data:{
        adminId:String(response.id),
        expires:expiry,
        token:token,
      }
    });
    return new Response(JSON.stringify({admin:true,status:200,email:response.email,token:token}));
  }else{
    return new Response(JSON.stringify({admin:false,status:500}));
  }
	
};
