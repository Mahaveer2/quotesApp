import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let categories = await prisma.category.findMany();

  return {
    categories:categories
  };

}