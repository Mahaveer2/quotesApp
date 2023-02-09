import Fuse from 'fuse.js';
import { getQuotes } from '$lib/functions';
import { PrismaClient } from '@prisma/client';
import { isAdmin } from '$lib/isAdmin';
import { json } from '@sveltejs/kit';

export const POST = async ({ request }) => {
	const client = new PrismaClient();
	const form = await request.formData();

	if (isAdmin(form.get('token'))) {
		const pending = await client.quote.findMany({
			where: {
				activated: false
			}
		});
		return json(pending);
	}

	return json({ status: 500 });
};
