import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';

import type { Post } from '^/entities/post/types';
import { apiClient } from '^/shared/api';

export default function PostArticlePage() {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('Post ID is required to show post article page.');
  }

  /**
   * @todo
   * Get comments using useInfiniteQuery
   * Add comments using useMutation
   */

  const { data, isPending } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      return response.data;
    },
  });

  const renderPost = isPending ? (
    <span className="w-full font-bold text-4xl border-b px-4 pb-4 text-left">
      로딩중
    </span>
  ) : (
    <>
      <span className="w-full text-left">게시글 ID: {data?.id}</span>
      <h1 className="w-full font-bold text-4xl border-b px-4 pb-4 text-left">
        {data?.content}
      </h1>
    </>
  );

  return (
    <section className="w-full max-w-4xl flex flex-col items-start text-center gap-8 p-24">
      <div className="w-full flex flex-col items-start gap-4">{renderPost}</div>
      <ul className="w-full flex flex-col items-start [&_li]:flex [&_li]:flex-col [&_li]:items-start [&_li]:w-full [&_li]:even:bg-gray-200 [&_li]:dark:even:bg-gray-700 [&_li]:p-2">
        <li>댓글 1</li>
        <li>댓글 2</li>
        <li>댓글 3</li>
        <li>댓글 4</li>
        <li>댓글 5</li>
        <li>댓글 6</li>
        <li>댓글 7</li>
      </ul>
    </section>
  );
}
