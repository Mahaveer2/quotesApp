import { error } from '@sveltejs/kit';
import client from '$lib/client';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let slug = params.category;

	let data = await client.category.findUnique({
		where: {
			id: Number(slug)
		},
		include: {
			Quotes: {
				where: {
					activated: true
				}
			}
		}
	});

	console.log(data);

	if (!data) {
		throw error(404, 'Not found');
	}

	return {
		quote: data,
		title: data.title
	};
}
