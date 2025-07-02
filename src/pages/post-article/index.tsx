import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router';

import type { Comment } from '^/entities/comment/types';
import type { Post } from '^/entities/post/types';
import { apiClient } from '^/shared/api';
import { ITEMS_PER_PAGE } from '^/shared/api/constants';
import type { GetPagenatedApiResponse } from '^/shared/api/types';
import TextInput from '^/shared/text-input';
import { useEffect, useState } from 'react';

export default function PostArticlePage() {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('Post ID is required to show post article page.');
  }

  const { data: postData, isPending: isPostDataPending } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      return response.data;
    },
  });

  const {
    data: commentData,
    isFetching: isCommentFetching,
    hasNextPage: isCommentHaveNextPage,
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

  const {
    mutate: postComment,
    isPending: isPostCommentPending,
    isSuccess: isPostCommentSuccess,
  } = useMutation({
    mutationFn: async (newComment: string) => {
      const response = await apiClient.post<Comment>('/comments', {
        postId,
        content: newComment,
      });
      return response.data;
    },
  });

  const { mutate: deleteComment } = useMutation({
    mutationFn: async (commentId: string) => {
      await apiClient.delete<Comment>(`/comments/${commentId}`);
    },
  });

  const [comment, setComment] = useState<string>('');

  useEffect(() => {
    if (!isPostCommentSuccess) {
      return;
    }
    setComment('');
  }, [isPostCommentSuccess]);

  const renderPost = isPostDataPending ? (
    <span className="w-full font-bold text-4xl border-b px-4 pb-4 text-left">
      로딩중
    </span>
  ) : (
    <>
      <div className="w-full flex flex-row justify-between">
        <span className="text-left">게시글 ID: {postData?.id}</span>
        <Link to={`/posts/${postId}/modify`}>수정하기</Link>
      </div>
      <h1 className="w-full font-bold text-4xl border-b px-4 pb-4 text-left">
        {postData?.content}
      </h1>
    </>
  );

  const renderComments = commentData?.pages
    .reduce((prev, current) => prev.concat(current.data), Array<Comment>(0))
    .map((comment) => (
      <li className="w-full flex flex-row" key={comment.id}>
        <span>{comment.content}</span>
        <button
          id={`delete-comment-${comment.id}`}
          type="button"
          className="cursor-pointer"
        >
          ❌
        </button>
      </li>
    ));

  const renderSeeMoreCommentsButtonLabel = (() => {
    if (isCommentFetching) {
      return '댓글 불러오는 중...';
    }

    if (!isCommentHaveNextPage) {
      return '댓글 모두 불러옴';
    }

    return '댓글 더 보기';
  })();

  return (
    <section className="w-full max-w-4xl flex flex-col items-start text-center gap-8 p-24">
      <div className="w-full flex flex-col items-start gap-4">{renderPost}</div>
      <ul
        className="w-full flex flex-col items-start [&_li]:flex [&_li]:flex-col [&_li]:items-start [&_li]:w-full [&_li]:even:bg-gray-200 [&_li]:dark:even:bg-gray-700 [&_li]:p-2"
        onClick={(event) => {
          if (!(event.target instanceof HTMLButtonElement)) {
            return;
          }
          deleteComment(event.target.id.split('delete-comment-')[1]);
        }}
      >
        {renderComments}
      </ul>
      <button
        className="px-4 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-300 disabled:bg-gray-300 disabled:cursor-auto"
        disabled={isCommentFetching || !isCommentHaveNextPage}
        onClick={() => {
          fetchNextPage();
        }}
        type="button"
      >
        {renderSeeMoreCommentsButtonLabel}
      </button>
      <form
        method="POST"
        className="w-full max-w-4xl flex flex-col items-center text-center gap-8 p-24"
        onSubmit={(event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const newComment = formData.get('postComment') as string;
          if (typeof newComment !== 'string' || newComment.length === 0) {
            return false;
          }
          postComment(newComment);
          return false;
        }}
      >
        <TextInput
          id="postComment"
          isMultiLine
          textValue={comment}
          onChange={setComment}
        />
        <button
          className="px-4 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-300 disabled:bg-gray-300 disabled:cursor-auto"
          disabled={
            comment.length === 0 || isPostCommentPending || !postData?.id
          }
          type="submit"
        >
          댓글 달기
        </button>
      </form>
    </section>
  );
}
