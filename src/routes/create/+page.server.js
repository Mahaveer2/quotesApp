import { error } from '@sveltejs/kit';
import client from '$lib/client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
  const categories = await client.category.findMany({});

    return {
        categories,
    };

}