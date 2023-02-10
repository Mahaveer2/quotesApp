import * as fs from 'fs/promises';
import * as path from 'path';
import { isAdmin } from "$lib/isAdmin";
import { RequestHandler, json } from '@sveltejs/kit';

export async function POST({ request }) {
  const data = await request.formData();
    if(isAdmin(data.get('token'))) {
      const file = data.get('image') as File;
      const { ext } = path.parse(file.name);
      await fs.writeFile(`static/backgrounds/${crypto.randomUUID()}${ext}`, file.stream()) ;
      return json({status:200,msg:"Background Uploaded succesfully!"})
    }

    return json({status:500,msg:"invalid request"})
}