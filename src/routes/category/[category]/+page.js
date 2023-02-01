import { error } from '@sveltejs/kit';
import { getQuote } from '$lib/functions';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let slug = params.category;

	return {
		slug: slug
	};
}
