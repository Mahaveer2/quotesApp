import { client,createClient } from "./SanityClient";

export const getQuotes = async () => {
  const data = await client.fetch(`*[_type == "Quotes"]`);
  return await data;
}

export const getBackgrounds = async () => {
  const data = await client.fetch(`*[_type == "backgrounds"]{"imageUrl": background.asset->url,Name}`)
  return data;
}

export const getQuote = async (slug) => {
  const data = await createClient.fetch(`*[slug.current == "${slug}"]`);
  return data; 
}

export const getCategory = async (key) => {
  const data = await client.fetch(`*[_type=="category" && _id == "${key}"]`);
  return data; 
};

export const getCategories = async () => {
  const data = await client.fetch(`*[_type=="category"]`);
  return data; 
};

export const QuoteFromCategory = async (category) => {
  const data = await client.fetch(`*[_type=="categories"]`);
  return data; 
};

export const trendingPosts = async () => {
  let data = await createClient.fetch(`*[_type=="Quotes"]`);
  data = data.filter(quote => quote.active)
  return data; 
};

export const getSiteSettings = async () => {
  let data = await client.fetch(`*[_type=="site"]{"logo": logo.asset->url,name,about,desc,head,url,rule}`);
  return data[0];
}