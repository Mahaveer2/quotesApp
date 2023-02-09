import { error } from '@sveltejs/kit';
import { getQuote } from "$lib/functions";
import { getCategories } from '../../lib/functions';
import { PrismaClient } from '@prisma/client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const client = new PrismaClient();

  const categories = await client.category.findMany({});

    return {
        categories,
    };

}