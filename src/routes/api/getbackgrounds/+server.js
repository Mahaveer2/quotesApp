import { PrismaClient } from "@prisma/client"
import { json } from "@sveltejs/kit";
import client from '$lib/client';
import { readdirSync } from 'fs';

const getImages = (dir) => {
  return readdirSync(dir).filter((file) => {
    return file.match(/\.(jpeg|jpg|gif|png)$/);
  });
};

export async function GET() {
  const images = getImages('static/backgrounds');
  return json(images);
}