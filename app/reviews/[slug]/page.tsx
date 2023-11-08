import Heading from "components/Heading";
import ShareButtons from "components/ShareButtons";
import { getReview, getSlugs } from 'lib/reviews';

interface ReviewPageParams {
  slug: string;
}

interface ReviewPageProps {
  params: ReviewPageParams;
}


//['use client' 진입점]
//중첩된 컴포넌트에서 'use client' 을 명시한 파일의 모든 child components, imported modules은 클라이언트 번들의 일부로 간주됨
//따라서 client side rendering이 필요한 모든 컴포넌트에서 'use client'를 명시하지 않아도 됨.
//이 페이지에 사용해도 client side rendering이 필요한 ShareLinkButton(하위 컴포넌트)에 적용할 수 있으나,
//서버에서 동작하는 Node.js의 fs 모듈을 사용하고 있어(readdir(), readFile()) 명시할 수 없음.
//또한, 'use client'는 필요할 때만, 기능적으로 클라이언트 사이드를 사용하고 있는 컴포넌트에만 명시하는 것이 좋음
export async function generateStaticParams() { //for SSG
  const slugs = await getSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  return {
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }: ReviewPageProps) {
  const review = await getReview(slug);
  return (
    <>
      <Heading>{review.title}</Heading>
      <div className='flex gap-3 items-baseline'>
        <p className='italic pb-2'>{review.date}</p>
        <ShareButtons />
      </div>
      <img
        src={review.image}
        alt=''
        width='640'
        height='360'
        className='mb-2 rounded'
      />
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className='max-w-screen-sm prose prose-slate'
      />
    </>
  );
}
