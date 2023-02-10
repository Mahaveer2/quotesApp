import { getSiteSettings } from "$lib/functions";

export async function load(){
  const data = await getSiteSettings();
  return data;
}