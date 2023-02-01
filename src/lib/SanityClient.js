import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId:"3093ikxg",
  dataset:"production",
  apiVersion:"2022-03-24",
  useCdn:true,
});

export const createClient = sanityClient({
  projectId:"3093ikxg",
  dataset:"production",
  apiVersion:"2022-03-24",
  useCdn:false,
  token:"sk2Lx0yG87QAbff3SY9ngt4WV4gBnYyxJF5GO7oE6tokf8uru67kWiguFaCv8jsDjBDOCD3QMOzUO73H0e4zjL09f5JsxvT653qEl5dIaSI9eMUPsjibixfmlPJt5dB6uN2QNm947D7EUClRFZbyXHdz5tLCcs58t1LrfvmTdWmtGNtxCgHQ ",
});