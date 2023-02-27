import Fuse from 'fuse.js';
import client from '$lib/client';

export const POST = async ({request}) => {
  const form = await request.formData();
	let data;
  if(form.get('token')){
		data = await client.quote.findMany({
			include:{
				category:true,
			}
		});
	}else{
		data = await client.quote.findMany({
			where:{
				activated:true,
			},
		});
	}
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
