import { fileURLToPath } from 'url';
import { json } from "@sveltejs/kit";
import { readdirSync } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  let client = new PrismaClient();
  let res = await client.backgrounds.findMany({});
 return json(res);
}