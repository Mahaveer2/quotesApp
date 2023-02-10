import Fuse from 'fuse.js';
import client from '$lib/client';

export const POST = async ({request}) => {
  const form = await request.formData();
  const data = await client.quote.findMany();
	let searchTxt = form.get('search');
  let quotes = [];

	let search = (search) => {
		const options = {
			keys: ['Author', 'quote']
		};

		const fuse = new Fuse(data, options);

		if (search == '') {
			return data;
		} else {
			let res = fuse.search(search);
			quotes = [];
			res.forEach((e) => {
				quotes.push(e.item);
				quotes = quotes;
			});
			return quotes;
		}
	};

	return new Response(JSON.stringify(search(searchTxt)));
};
