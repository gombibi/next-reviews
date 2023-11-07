import { writeFileSync } from 'node:fs'
import qs from 'qs'

//Strapi REST API by default does not include any relations, media fields and similar.
//An image in the CMS is like a seperate object, that's associated with a Review entry.
//Use populate parameter to populate specific fields
// const url = 'http://localhost:1337/api/reviews' + '?populate=*'
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
      filters: { slug: { $eq: 'hades-2018' } },
      fields: ['slug', 'title', 'subtitle', 'publishedAt', 'body'],
      populate: { image: { fields: ['url'] } },
      pagination: { pageSize: 1, withCount: false },
    },
    { encodeValuesOnly: true }
  );
console.log(url);
const response = await fetch(url)
const body = await response.json()
const formatted = JSON.stringify(body, null, 2)
const file = 'scripts/strapi-response.json'
writeFileSync(file, formatted, 'utf-8');