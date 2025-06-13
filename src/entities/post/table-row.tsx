import type { Post } from './types';

interface Props {
  post: Post;
}

export function PostTableRow({ post }: Props) {
  /**
   * @todo
   * Add link to /posts/{postId}
   */

  return (
    <tr>
      <td>{post.id}</td>
      <td className="text-start">{post.content}</td>
    </tr>
  );
}
