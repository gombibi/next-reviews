import Image from 'next/image'
import Link from "next/link";

interface cardProps {
  slug: string;
  href: string;
  imgSrc: string;
  title: string;
  index: number;
}

export default function Card(props: cardProps) {
  return (
    <li key={props.slug} className='bg-white border rounded shadow w-80 hover:shadow-xl'>
      <Link href={props.href}>
        <Image src={props.imgSrc} alt='' priority={props.index === 0} width='320' height='180' className='mb-2 rounded-t' />
        <h2 className='font-semibold font-orbitron py-1 text-center'>{props.title}</h2>
      </Link>
    </li>
  );
}
