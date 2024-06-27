import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "5m8dm6xl",
  dataset: "production",
  apiVersion: "2022-03-10",
  useCdn: true,
});

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}
// import { SanityClient } from "@sanity/client";
// import { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
// // import { ImageUrlBuilder } from "sanity";


// const client = SanityClient({
//     projectId: "5m8dm6xl",
//     dataset: "production",
//     apiVersion: "2022-03-10",
//     useCdn: true,
//     token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
// })

// const builder = ImageUrlBuilder(client)

// export function urlFor(source:any){
//     return builder.image(source)
// }