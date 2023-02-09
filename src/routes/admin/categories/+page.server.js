import { error } from '@sveltejs/kit';
import { getQuote } from "$lib/functions";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  let categories = await prisma.category.findMany();

  return {
    categories:categories
  };

}