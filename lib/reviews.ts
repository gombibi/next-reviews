import { readdir, readFile } from "fs/promises";
import matter from "gray-matter";
import { marked } from "marked";

interface review {
  slug:string,
  title:string,
  date:string,
  image:string,
  body:string,
}

export async function getReview(slug: string) {
  const text = await readFile(`./content/reviews/${slug}.md`, 'utf-8');
  const {
    content,
    data: { title, date, image },
  } = matter(text);
  const body = marked(content);
  return { slug, title, date, image, body };
}

export async function getReviews(){
  const slugs = await getSlugs();
  const reviews = [];
  for (const slug of slugs) {
    const review = await getReview(slug);
    reviews.push(review);
  }

  // 최신 리뷰가 앞에 오도록 정렬(날짜 내림차순)
  // return reviews.sort((a: review, b: review) => {
  //   return +new Date(b.date) - +new Date(a.date);
  // });
  return reviews.sort((a: review, b: review) => {
    return b.date.localeCompare(a.date);
  });
}

export async function getSlugs() {
  const files = await readdir('./content/reviews')
  return files
    .filter(file => file.endsWith('.md'))
    .map(file => file.slice(0, -'.md'.length))
}