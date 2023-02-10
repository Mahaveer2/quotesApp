import * as fs from 'fs/promises';
import * as path from 'path';
import { isAdmin } from "$lib/isAdmin";
import path from 'path';
import { RequestHandler, json } from '@sveltejs/kit';

export async function POST({ request }) {
  const root = path.resolve(process.cwd());
  const data = await request.formData();
    if(isAdmin(data.get('token'))) {
      try{
        const file = data.get('image') as File;
      const { ext } = path.parse(file.name);
      await fs.writeFile(root+`/static/backgrounds/${crypto.randomUUID()}${ext}`, file.stream()) ;
      return json({status:200,msg:"Background Uploaded succesfully!"})
      }catch(e){
        return json(e);
      }
    }

    return json({status:500,msg:"invalid request"})
}