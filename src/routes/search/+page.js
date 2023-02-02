import { getQuotes,getCategories } from "$lib/functions";

export async function load({ params }) {
  let data =  getQuotes()
  let categories = await getCategories();

  console.log(categories)
  
  return {
    data:data,
    categories:categories,
  }
}