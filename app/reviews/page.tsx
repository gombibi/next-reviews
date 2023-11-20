import Heading from "components/Heading";
import Card from "components/Card";
import { Review, getReviews } from "lib/reviews";

export const metadata = {
  title: 'Reviews',
};

export default async function ReviewsPage() {
  const reviews = await getReviews(6)
  return (
    <>
      <Heading>Reviews</Heading>
      <ul className='flex flex-row flex-wrap gap-3'>
        {reviews.map((review: Review, index) => (
          <Card
            key={review.slug}
            slug={review.slug}
            href={`/reviews/${review.slug}`}
            imgSrc={review.image}
            title={review.title}
            index={index}
          />
        ))}
      </ul>
    </>
  );
}
