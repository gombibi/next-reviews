import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import Image from 'next/image';
import Heading from '@/components/Heading';
import ShareButtons from '@/components/ShareButtons';
import { getReview, getSlugs } from '@/lib/reviews';
import { notFound } from 'next/navigation';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}

//dynamic randering
// export const dynamic = 'force-dynamic' // dynamic generate. <-> generateStaticParams()는 static generate
// export const dynamicParams = true;  // default true : included in generateStaticParams, if we add a new review in the CMS, Next.js generates on demend

//static rendering
export async function generateStaticParams(): Promise<ReviewPageParams[]> {
  //  ['use client' 진입점]
  //  중첩된 컴포넌트에서 'use client' 을 명시한 파일의 모든 child components, imported modules은 클라이언트 번들의 일부로 간주됨
  //  따라서 client side rendering이 필요한 모든 컴포넌트에서 'use client'를 명시하지 않아도 됨.
  //  이 페이지에 사용해도 client side rendering이 필요한 ShareLinkButton(하위 컴포넌트)에 적용할 수 있으나,
  //  서버에서 동작하는 Node.js의 fs 모듈을 사용하고 있어(readdir(), readFile()) 명시할 수 없음.
  //  또한, 'use client'는 필요할 때만, 기능적으로 클라이언트 사이드를 사용하고 있는 컴포넌트에만 명시하는 것이 좋음

  const slugs = await getSlugs();
  return slugs.map(slug => ({ slug }));
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  if (!review) {
    notFound();
  }
  return (
    <>
      <Heading>{review.title}</Heading>
      <p className='font-semibold pb-3'>{review.subtitle}</p>
      <div className='flex gap-3 items-baseline'>
        <p className='italic pb-2'>{review.date}</p>
        <ShareButtons />
      </div>
      <Image src={review.image} alt='' priority width='640' height='360' className='mb-2 rounded' />
      <article dangerouslySetInnerHTML={{ __html: review.body }} className='max-w-screen-sm prose prose-slate' />
      <section className='border-dashed border-t max-w-screen-sm mt-3 py-3'>
        <h2 className='font-bold flex gap-2 items-center text-xl'>
          <ChatBubbleBottomCenterTextIcon className='h-6 w-6' />
          Comments
        </h2>
        <CommentForm title={review.title} />
        <CommentList slug={slug} />
      </section>
    </>
  );
}
