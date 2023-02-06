import { getQuotes,getCategories } from "$lib/functions";

export async function load({ params }) {
  let data = await getQuotes()
  let categories = await getCategories();

  data = data.filter(quote => {
    return quote.active;
  })
  
  return {
    data:data,
    categories:categories,
  }
}