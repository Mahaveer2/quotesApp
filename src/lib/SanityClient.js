import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId:"3093ikxg",
  dataset:"production",
  apiVersion:"2022-03-24",
  useCdn:true,
});