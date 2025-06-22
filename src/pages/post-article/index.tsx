import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import type { Comment } from '^/entities/comment/types';
import type { Post } from '^/entities/post/types';
import { apiClient } from '^/shared/api';
import { ITEMS_PER_PAGE } from '^/shared/api/constants';
import type { GetPagenatedApiResponse } from '^/shared/api/types';

export default function PostArticlePage() {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('Post ID is required to show post article page.');
  }

  /**
   * @todo
   * Add comments using useMutation
   */

  const { data: postData, isPending } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      return response.data;
    },
  });

  const {
    data: commentData,
    isFetching,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['comments', postData?.id],
    queryFn: async ({ pageParam }) =>
      (
        await apiClient.get<GetPagenatedApiResponse<Comment>>(
          `/comments?postId=${postData?.id}&_page=${pageParam}&_per_page=${ITEMS_PER_PAGE}`
        )
      ).data,
    initialPageParam: 1,
    getPreviousPageParam: (firstPage) => firstPage.prev,
    getNextPageParam: (lastPage) => lastPage.next,
    enabled: Boolean(postData?.id),
  });

  const renderPost = isPending ? (
    <span className="w-full font-bold text-4xl border-b px-4 pb-4 text-left">
      로딩중
    </span>
  ) : (
    <>
      <span className="w-full text-left">게시글 ID: {postData?.id}</span>
      <h1 className="w-full font-bold text-4xl border-b px-4 pb-4 text-left">
        {postData?.content}
      </h1>
    </>
  );

  const renderComments = commentData?.pages
    .reduce((prev, current) => prev.concat(current.data), Array<Comment>(0))
    .map((comment) => <li key={comment.id}>{comment.content}</li>);

  const renderSeeMoreCommentsButtonLabel = (() => {
    if (isFetching) {
      return '댓글 불러오는 중...';
    }

    if (!hasNextPage) {
      return '댓글 모두 불러옴';
    }

    return '댓글 더 보기';
  })();

  return (
    <section className="w-full max-w-4xl flex flex-col items-start text-center gap-8 p-24">
      <div className="w-full flex flex-col items-start gap-4">{renderPost}</div>
      <ul className="w-full flex flex-col items-start [&_li]:flex [&_li]:flex-col [&_li]:items-start [&_li]:w-full [&_li]:even:bg-gray-200 [&_li]:dark:even:bg-gray-700 [&_li]:p-2">
        {renderComments}
      </ul>
      <button
        className="px-4 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-300 disabled:bg-gray-300 disabled:cursor-auto"
        disabled={isFetching || !hasNextPage}
        onClick={() => {
          fetchNextPage();
        }}
        type="button"
      >
        {renderSeeMoreCommentsButtonLabel}
      </button>
    </section>
  );
}
