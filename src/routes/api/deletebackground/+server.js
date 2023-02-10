import * as fs from 'fs/promises';
import { isAdmin } from "$lib/isAdmin";
import { RequestHandler, json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.formData();
    if(isAdmin(data.get('token'))) {
      try{
        fs.unlink(`static/backgrounds/${data.get('path')}`, (error) => {
          if (error) {
            console.error(`Error deleting file: ${error}`);
            return json({status:500,msg:"Error deleting file"})
          } 
        });
        
        return json({status:200,msg:"delete file succesfully"})
      }catch(e){
        return json(e)
      }

    }

    return json({status:500,msg:"invalid request"})
}