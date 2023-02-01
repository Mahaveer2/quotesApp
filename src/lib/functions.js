import { client } from "./SanityClient";

export const getQuotes = async () => {
  const data = await client.fetch(`*[_type == "Quotes"]`);
  return await data;
}

export const getBackgrounds = async () => {
  const data = await client.fetch(`*[_type == "backgrounds"]{"imageUrl": background.asset->url,Name}`)
  return data;
}

export const getQuote = async (slug) => {
  const data = await client.fetch(`*[slug.current == "${slug}"]`);
  return data; 
}

export const getCategory = async (key) => {
  const data = await client.fetch(`*[_type=="category" && _id == "${key}"]`);
  return data; 
};

export const QuoteFromCategory = async (category) => {
  const data = await client.fetch(`*[_type=="Quotes"]`);
  return data; 
};

export const trendingPosts = async () => {
  const data = await client.fetch(`*[_type=="trending"]`);
  return data; 
};