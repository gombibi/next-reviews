import Heading from "components/Heading";
import { getReviews } from 'lib/reviews';
import Link from "next/link";
import { metadata } from "./layout";
import Image from "next/image";

// export const dynamic = 'force-dynamic';
// export const revalidate = 30; //rerender in seconds

export default async function HomePage(){
  const reviews = await getReviews(3);

  return (
    <>
      <Heading>{metadata.title.default}</Heading>
      <p className='pb-3'>{metadata.description}</p>

      <ul>
        {reviews.map((review, index) => (
          <li key={review.slug} className='bg-white border rounded shadow w-80 hover:shadow-xl sm:w-full'>
            <Link href={`/reviews/${review.slug}`} className='flex flex-col sm:flex-row'>
              <Image
                src={review.image}
                alt=''
                priority={index === 0}
                width='320'
                height='180'
                className='rounded-t sm:rounded-l sm:rounded-r-none'
              />
              <div className='px-2 py-1 text-center sm:text-left'>
                <h2 className='font-semibold font-orbitron'>{review.title}</h2>
                <p className='hidden pt-2 sm:block'>{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}