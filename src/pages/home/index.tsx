import { NavLink } from 'react-router';

export default function HomePage() {
  return (
    <section className="flex flex-col items-center text-center gap-12 pt-24">
      <h1 className="font-bold text-4xl">TanStackQueryBoard</h1>
      <article>
        <h2 className="font-bold text-3xl">개요</h2>
        <p>
          TanStack Query의 useQuery, useInfiniteQuery, useMutation을 연습하기
          위해 만들어진 레포지토리.
        </p>
      </article>
      <article>
        <h2 className="font-bold text-3xl">사용한 주요 스택</h2>
        <p>React + Vite, TanStack Query, JSON Server 등등</p>
      </article>
      <article>
        <NavLink to="/posts" className="font-bold text-2xl hover:text-blue-200">
          게시글 둘러보기
        </NavLink>
      </article>
    </section>
  );
}
