import { getBackgrounds,getQuotes,getSiteSettings } from "$lib/functions";
import { settingData } from "$lib/stores.js";
import _, { map } from 'underscore';

export async function load({ params }) {
  let data = await getBackgrounds()
  let settings = await getSiteSettings();
  settingData.set(settings);
  let quotes = await getQuotes()
  quotes = _.shuffle(quotes);
  
  return {
    settings:settings,
    data:data,
    quotes:quotes,
  }
}