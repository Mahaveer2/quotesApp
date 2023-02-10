import Fuse from 'fuse.js';
import { PrismaClient } from '@prisma/client';
import { isAdmin } from '$lib/isAdmin';
import { json } from '@sveltejs/kit';
import client from '$lib/client';

export const POST = async ({ request }) => {
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
