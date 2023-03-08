import { isAdmin } from '$lib/isAdmin';
import { PrismaClient } from '@prisma/client';
import { RequestHandler, json } from '@sveltejs/kit';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
	cloud_name: import.meta.env.VITE_CLOUD_NAME ,
	api_key: import.meta.env.VITE_CLOUD_KEY,
	api_secret: import.meta.env.VITE_CLOUD_SECRET
});
export async function POST({ request }) {
	const data = await request.json();
	if (isAdmin(data.token)) {
		try {
			const client = new PrismaClient();
			const photoUrl = await cloudinary.uploader.upload(data.image,{
				transformation: [
						{ format: 'webp'},
						{ width: 1980, height: 1080, crop: 'limit' } // example of additional transformation options
				]}).then(async (url) => {
				let _res = await client.backgrounds.update({
					where:{
						id: Number(data.id)
					},
					data: {
						url: url.url,
					}
				});
				return json(_res);
			});
			return json(res);
		} catch (e) {
			return json(e);
		}
	}

	return json({ status: 500, msg: 'invalid request' });
}
