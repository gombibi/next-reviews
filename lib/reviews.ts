import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";
import qs from 'qs';

interface review {
  slug:string,
  title:string,
  date:string,
  image:string,
  body:string,
}

const CMS_URL = 'http://localhost:1337';

export async function getReview(slug: string) {
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
    'http://localhost:1337/api/reviews' +
    '?' +
    qs.stringify(
      {
        //get list
        // fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        // populate: { image: {fields: ['url']}},
        // sort: ['publishedAt:desc'],
        // pagination: { pageSize: 6 },

        //get a review
        filters: { slug: { $eq: slug } },
        fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
        populate: { image: { fields: ['url'] } },
        pagination: { pageSize: 1, withCount: false },
      },
      { encodeValuesOnly: true }
    );
  const response = await fetch(url);
  const data = await response.json();
  const { title, date, image, body } = data[0];
  return { slug, title, date, image, body };
}

export async function getReviews(){
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
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(
      {
        fields: ['slug', 'title', 'subtitle', 'publishedAt'],
        populate: { image: { fields: ['url'] } },
        sort: ['publishedAt:desc'],
        pagination: { pageSize: 6 },
      }, { encodeValuesOnly: true }
    );
  const response = await fetch(url);
  const { data } = await response.json();
  return data.map(({ attributes }) => ({
    slug: attributes.slug,
    title: attributes.title,
    date: attributes.publishedAt.slice(0, 'yyyy-mm-dd'.length),
    image: CMS_URL + attributes.image.data.attributes.url,
  }));
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.slice(0, -'.md'.length))
}