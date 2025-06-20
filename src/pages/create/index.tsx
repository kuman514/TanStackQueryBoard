import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import type { Post } from '^/entities/post/types';
import { apiClient } from '^/shared/api';
import TextInput from '^/shared/text-input';
import { useNavigate } from 'react-router';

export default function CreatePage() {
  const navigate = useNavigate();

  const [content, setContent] = useState<string>('');
  const { mutate, isPending, isSuccess, data } = useMutation({
    mutationFn: async (newContent: string) => {
      const response = await apiClient.post<Post>('/posts', {
        content: newContent,
      });
      return response.data;
    },
  });

  useEffect(() => {
    if (!isSuccess || !data.id) {
      return;
    }
    navigate(`/posts/${data.id}`);
  }, [isSuccess, data?.id, navigate]);

  return (
    <form
      action="POST"
      className="w-full max-w-4xl flex flex-col items-center text-center gap-8 p-24"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const newContent = formData.get('postContent') as string;
        console.log(newContent);
        if (!newContent || !newContent?.length || newContent.length === 0) {
          return false;
        }
        mutate(newContent);
        return false;
      }}
    >
      <TextInput
        id="postContent"
        isMultiLine
        textValue={content}
        onChange={setContent}
      />
      <button
        className="px-4 py-3 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-300 disabled:bg-gray-300 disabled:cursor-auto"
        disabled={content.length === 0 || isPending}
        type="submit"
      >
        등록
      </button>
    </form>
  );
}
