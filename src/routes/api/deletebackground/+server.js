import * as fs from 'fs/promises';
import { isAdmin } from "$lib/isAdmin";
import { RequestHandler, json } from '@sveltejs/kit';
import client from "$lib/client";
import { v2 as cloudinary } from 'cloudinary';

export async function POST({ request }) {
  const data = await request.formData();
    if(isAdmin(data.get('token'))) {
      console.log(data.get('url'))
      let bg = await client.backgrounds.delete({
        where:{
          id: Number(data.get('id')),
        }
      })

      return json({status:200});
    }

    return json({status:500,msg:"invalid request"})
}