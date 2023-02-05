import { getQuotes } from "$lib/functions";
import _, { map } from 'underscore';

export async function load({ params }) {
  let data = await getQuotes()
  data = _.shuffle(data);
  
  return {
    data:data,
  }
}