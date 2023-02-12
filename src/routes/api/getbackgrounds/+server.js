import { fileURLToPath } from 'url';
import { json } from "@sveltejs/kit";
import { readdirSync } from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

export async function GET() {
  let client = new PrismaClient();
  let res = await client.backgrounds.findMany({});
  if(!res){
    let del = await client.backgrounds.deleteMany({});
    let data = await client.backgrounds.createMany({
      data:[
        {page:'Home',url:'https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=1480&t=st=1676182924~exp=1676183524~hmac=d43d95940237e930d6427394adef0a0e2d9801900f37f6b6093c601e2c178538'},
        {page:'About',url:'https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=1480&t=st=1676182924~exp=1676183524~hmac=d43d95940237e930d6427394adef0a0e2d9801900f37f6b6093c601e2c178538'},
        {page:'Create',url:'https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=1480&t=st=1676182924~exp=1676183524~hmac=d43d95940237e930d6427394adef0a0e2d9801900f37f6b6093c601e2c178538'},
        {page:'Trending',url:'https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=1480&t=st=1676182924~exp=1676183524~hmac=d43d95940237e930d6427394adef0a0e2d9801900f37f6b6093c601e2c178538'},
        {page:'Gallery',url:'https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=1480&t=st=1676182924~exp=1676183524~hmac=d43d95940237e930d6427394adef0a0e2d9801900f37f6b6093c601e2c178538'},
        {page:'Search',url:'https://img.freepik.com/free-vector/halftone-background-with-circles_23-2148907689.jpg?w=1480&t=st=1676182924~exp=1676183524~hmac=d43d95940237e930d6427394adef0a0e2d9801900f37f6b6093c601e2c178538'}
      ]
    })

    return data;
  }
 return json(res);
}