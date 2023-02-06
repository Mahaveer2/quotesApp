import { getBackgrounds,getSiteSettings } from "$lib/functions";
import { settingData } from "$lib/stores.js";
export const trailingSlash = 'always';

export async function load({ params }) {
  let data = await getBackgrounds()
  let settings = await getSiteSettings();
  settingData.set(settings);
  
  return {
    settings:settings,
    data:data,
  }
}