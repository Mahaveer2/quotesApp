import { PrismaClient } from '@prisma/client';
import Fuse from 'fuse.js';
import { isAdmin } from "$lib/isAdmin";
import { json } from '@sveltejs/kit';

export const POST = async ({request}) => {
  const client = new PrismaClient();
  const formData = await request.formData();
  if(isAdmin(formData.get('token'))){
    let user = await client.admin.findUnique({
      where:{
        email: formData.get('email'),
      }
    });

    if(user){
      if(user.password === formData.get('old')){
        let update = await client.admin.update({
          where:{
            email: formData.get('email'),
          },
          data:{
            email:formData.get('newemail'),
            password: formData.get('password')
          }
        })
        return json({status:200,msg:"updated succesfully!"})
     }else{
      return json({status:500,msg:'invalid credentials'})
     }
    }if(!user){
      return json({status:500,msg:'invalid credentials!'})
    }
  }
}