import { useMutation, useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import type { Post } from '^/entities/post/types';
import { apiClient } from '^/shared/api';
import TextInput from '^/shared/text-input';

export default function ModifyPage() {
  const { postId } = useParams();
  if (!postId) {
    throw new Error('Post ID is required to show post modify page.');
  }

  const navigate = useNavigate();

  const { data: postData, isPending: isGetPostArticlePending } = useQuery({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await apiClient.get<Post>(`/posts/${postId}`);
      return response.data;
    },
  });

  const [content, setContent] = useState<string>('');
  const {
    mutate,
    isPending: isPatchPostArticlePending,
    isSuccess,
  } = useMutation({
    mutationFn: async (newContent: string) => {
      const response = await apiClient.patch<Post>(`/posts/${postId}`, {
        content: newContent,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (!isSuccess) {
      return;
    }
    navigate(`/posts/${postId}`);
  }, [isSuccess, postId, navigate]);

  useEffect(() => {
    if (!postData) {
      return;
    }
    setContent(postData.content);
  }, [postData]);

  return (
    <form
      method="PATCH"
      className="w-full max-w-4xl flex flex-col items-center text-center gap-8 p-24"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newContent = formData.get('postContent');
        if (typeof newContent !== 'string' || newContent.length === 0) {
          return false;
        }
        mutate(newContent);
        return false;
      }}
    >
      <h1 className="font-bold text-4xl">{postId} 게시물 수정하기</h1>
      <TextInput
        id="postContent"
        isMultiLine
        textValue={content}
        onChange={setContent}
      />
      <button
        className="px-4 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-300 disabled:bg-gray-300 disabled:cursor-auto"
        disabled={
          content.length === 0 ||
          isPatchPostArticlePending ||
          isGetPostArticlePending
        }
        type="submit"
      >
        등록
      </button>
    </form>
  );
}
