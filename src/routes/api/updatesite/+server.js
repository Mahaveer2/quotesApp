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
	const data = await request.formData();
	if (isAdmin(data.get('token'))) {
		try {
			const client = new PrismaClient();
      const res = await client.site.update({
				where:{
					id:1,
				},
        data:{
          data:data.get('json'),
        }
      })
      return json({status:200})
		} catch (e) {
			return json({status:500,error:e})
		}
	}

	return json({ status: 500, msg: 'invalid request' });
}
