import { error } from '@sveltejs/kit';
import { getCategories,getQuotes } from '$lib/functions';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	let slug = params.category;
	let categories = await getCategories();
	let category = null;
	let title = null;
	let _quotes = [];
	categories.forEach( c => {
		if(c.slug.current == slug){
			title = c.title;
			category = c;
		}
	})

	let quotes = await getQuotes();

	if(quotes && category){
		let id = category._id;
		quotes.forEach(quote => {
			quote.category.forEach(q => {
				if(q._ref === id){
					_quotes.push(quote);
					_quotes = _quotes;
				}
			})
		})
	}
	

	if(_quotes.length > 0){
		return {
			title:title,
			data: _quotes
		};
	}else{
		throw error(404, {
      message: 'Not found'
    });
	}
}
