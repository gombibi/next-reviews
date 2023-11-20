import Heading from "components/Heading";
import { getReviews } from 'lib/reviews';
import Link from "next/link";
import { metadata } from "./layout";
import Image from "next/image";

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
              <h2 className='font-semibold font-orbitron py-1 text-center sm:px-2'>Stardew Valley</h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}