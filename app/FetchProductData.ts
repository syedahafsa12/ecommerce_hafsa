// fetchProductData.ts
import { client } from "./lib/sanity";
import { fullProduct } from "./interface";

export async function getProductData(slug: string): Promise<fullProduct> {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }`;

  const data: fullProduct = await client.fetch(query);
  return data;
}
