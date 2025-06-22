import { useInfiniteQuery } from '@tanstack/react-query';

import { PostTableRow } from '^/entities/post/table-row';
import type { Post } from '^/entities/post/types';
import { apiClient } from '^/shared/api';
import type { GetPagenatedApiResponse } from '^/shared/api/types';

const POSTS_PER_PAGE = 10;

export default function PostTablePage() {
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['post-list'],
    queryFn: async ({ pageParam }) =>
      (
        await apiClient.get<GetPagenatedApiResponse<Post>>(
          `/posts?_page=${pageParam}&_per_page=${POSTS_PER_PAGE}`
        )
      ).data,
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.prev,
    getNextPageParam: (lastPage) => lastPage.next,
  });

  const renderPostTableRows = data?.pages
    .reduce((prev, current) => prev.concat(current.data), Array<Post>(0))
    .map((post) => <PostTableRow key={post.id} post={post} />);

  const renderButtonLabel = (() => {
    if (isFetching) {
      return '불러오는 중...';
    }

    if (!hasNextPage) {
      return '모두 불러옴';
    }

    return '더 보기';
  })();

  return (
    <section className="w-full max-w-4xl flex flex-col items-center text-center gap-12 p-24">
      <h1 className="font-bold text-4xl">게시글 목록</h1>
      <table className="w-full border">
        <thead className="border-b">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">게시글</th>
          </tr>
        </thead>
        <tbody className="[&_tr]:even:bg-gray-200 [&_tr]:dark:even:bg-gray-800">
          {renderPostTableRows}
        </tbody>
      </table>
      <button
        className="px-4 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-300 disabled:bg-gray-300 disabled:cursor-auto"
        disabled={isFetching || !hasNextPage}
        onClick={() => {
          fetchNextPage();
        }}
        type="button"
      >
        {renderButtonLabel}
      </button>
    </section>
  );
}
