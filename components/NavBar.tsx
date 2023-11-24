import NavLink from './NavLink';

export default function NavBar() {
  return (
    <nav>
      <ul className='flex gap-2'>
        <li className='font-bold font-orbitron'>
          <NavLink href='/'>Indie Gamer</NavLink>
        </li>
        <li className='ml-auto'>
          <NavLink href='/reviews'>Reviews</NavLink>
        </li>
        <li>
          {/* Next.js는 페이지 내의 모든 링크의 페이지를 prefetch함. -> 유저 로딩 시간 단축
          prefetch하고 싶지 않으면(1. 페이지 용량이 매우 크거나 2. 매우 적은 사람이 접근할 것으로 추측) false값을 주면 됨. 
          단, dev or production 모드에 따라 prefetch 가 다르게 동작하므로,
          production 모드로 테스트하기 위해서는 npm run build + npm start 를 통해 테스트해야 함. */}
          <NavLink href='/about' prefetch={false}>
            About
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
