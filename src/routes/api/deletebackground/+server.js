import * as fs from 'fs/promises';
import { isAdmin } from "$lib/isAdmin";
import { RequestHandler, json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.formData();
    if(isAdmin(data.get('token'))) {
      fs.unlink(`static/backgrounds/${data.get('path')}`, (error) => {
        if (error) {
          console.error(`Error deleting file: ${error}`);
          return json({status:500,msg:"Error deleting file"})
        } 
      });

      return json({status:200,msg:"delete file succesfully"})
    }

    return json({status:500,msg:"invalid request"})
}