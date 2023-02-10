import { PrismaClient } from "@prisma/client"
import { fileURLToPath } from 'url';
import { json } from "@sveltejs/kit";
import client from '$lib/client';
import { readdirSync } from 'fs';
import path from 'path';

const getImages = (dir) => {
  return readdirSync(dir).filter((file) => {
    return file.match(/\.(jpeg|jpg|gif|png)$/);
  });
};

export function GET() {
  const root = path.resolve(process.cwd());
 try{
  const images = getImages(root+'/static/backgrounds');
  return json(images);
 }catch(e){
  return json(e);
  console.log("error")
 }
}