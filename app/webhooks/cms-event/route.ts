import { CACHE_TAG_REVIEWS } from "lib/reviews";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  const payload = await request.json();
  if(payload.model === 'review'){
    revalidateTag(CACHE_TAG_REVIEWS)
  }
  console.log('revalidated:', CACHE_TAG_REVIEWS);
  return new Response(null, { status: 204 })
}