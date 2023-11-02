import Link from "next/link";

interface cardProps {
  key: string;
  href: string;
  imgSrc: string;
  title: string;
}

export default function Card(props: cardProps) {
  return (
    <li
      key={props.key}
      className='bg-white border rounded shadow w-80 hover:shadow-xl'
    >
      <Link href={props.href}>
        <img
          src={props.imgSrc}
          alt=''
          width='320'
          height='180'
          className='mb-2 rounded-t'
        />
        <h2 className='font-semibold font-orbitron py-1 text-center'>
          {props.title}
        </h2>
      </Link>
    </li>
  );
}
