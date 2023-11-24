import Heading from "components/Heading";
import Card from "components/Card";
import { Review, getReviews } from "lib/reviews";
import PaginationBar from "components/PaginationBar";

interface ReviewsPageProps {
  searchParams: { page?: string };
}

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; //rerender in seconds

export const metadata = {
  title: 'Reviews',
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({searchParams}: ReviewsPageProps) {
  const page = parsePageParam(searchParams.page);
  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  return (
    <>
      <Heading>Reviews</Heading>
      <PaginationBar href='/reviews' page={page} pageCount={pageCount}/>
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

function parsePageParam(paramValue){
  if(paramValue){
    const page = parseInt(paramValue)
    if(isFinite(page) && page > 0){
      return page;
    }
  }
  return 1;
}