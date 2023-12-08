import 'server-only'
import { marked } from "marked";
import qs from 'qs';

export interface Review {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  body: string;
}

export interface PaginatedReviews {
  pageCount: number;
  reviews: Review[];
}

interface FetchReviewsParam {
  fields: string[];
  populate?: { image: { fields: string[] } };
  sort?: string[];
  pagination?: {
    pageSize: number; //default = 25
    page?: number;
  };
  filters?: {
    title: {}
  };
}

interface ReviewAttribute {
  attributes: {
    slug: string;
    title: string;
    subtitle: string;
    publishedAt: string;
    image: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

export type SearchableReview = Pick<Review, 'slug' | 'title'>;

export const CACHE_TAG_REVIEWS = 'reviews'

//Environment variable setting if using Windows Command Prompt : set
//Nest.js supports .env files
const CMS_URL = process.env.CMS_URL;

export async function getReview(slug: string): Promise<Review> {
  //loading static data
  // const text = await readFile(`./content/reviews/${slug}.md`, 'utf-8');
  // const {
  //   content,
  //   data: { title, date, image },
  // } = matter(text);
  // const body = marked(content);
  // return { slug, title, date, image, body };

  //fetching data by fetch api
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    );
  const response = await fetch(url);
  const { data } = await response.json();
  if(data.length === 0){
    return null
  }
  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize: number, page?: number): Promise<PaginatedReviews> {
  //loading static data
  // const slugs = await getSlugs();
  // const reviews = [];
  // for (const slug of slugs) {
  //   const review = await getReview(slug);
  //   reviews.push(review);
  // }

  //최신 리뷰가 앞에 오도록 정렬(날짜 내림차순)
  // return reviews.sort((a: review, b: review) => {
  //   return b.date.localeCompare(a.date);
  // });

  //fetching data by fetch api
  const { data, meta } = await fetchReviews({
    fields: ['slug', 'title', 'subtitle', 'publishedAt'],
    populate: { image: { fields: ['url'] } },
    sort: ['publishedAt:desc'],
    pagination: { pageSize, page },
  });
  return {
    pageCount: meta.pagination.pageCount,
    reviews: data.map(toReview),
  };
}

export async function searchReviews(query: string): Promise<SearchableReview[]> {
  const { data } = await fetchReviews({
    filters: { title: { $containsi: query } },
    fields: ['slug', 'title'],
    sort: ['title'],
    pagination: { pageSize: 5 },
  });
  return data.map(({ attributes }: ReviewAttribute) => ({
    slug: attributes.slug,
    title: attributes.title,
  }));
}

export async function getSlugs(): Promise<string[]> {
  // //only available locally
  // const files = await readdir('./content/reviews');
  // return files
  //   .filter(file => file.endsWith('.md'))
  //   .map(file => file.slice(0, -'.md'.length));

  //fetch the slugs from the CMS
  const { data } = await fetchReviews({
    fields: ['slug'],
    sort: ['publishedAt:desc'],
    pagination: { pageSize: 100 },
  });
  return data.map((item: ReviewAttribute) => item.attributes.slug);
}

async function fetchReviews(param: FetchReviewsParam) {
  const url =
    `${CMS_URL}/api/reviews?` + qs.stringify(param, { encodeValuesOnly: true });
  const response = await fetch(url, {
    // cache: 'no-store', //Next.js not to save any responses to the cache
    next: {
      // revalidate: 30, //seconds
      tags: [CACHE_TAG_REVIEWS], //revalidate on demand instead of page level
    },
  });
  if (!response.ok) {
    throw new Error(`CMS returned ${response.status} for ${url}`);
  }
  return await response.json();
}

function toReview(item: ReviewAttribute) {
  const { attributes } = item;
  return {
    slug: attributes.slug,
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
}