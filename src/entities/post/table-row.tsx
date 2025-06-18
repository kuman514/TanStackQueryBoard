import { Link } from 'react-router';
import type { Post } from './types';

interface Props {
  post: Post;
}

export function PostTableRow({ post }: Props) {
  return (
    <tr>
      <td>{post.id}</td>
      <td className="text-start cursor-pointer hover:text-blue-200">
        <Link to={`/posts/${post.id}`}>{post.content}</Link>
      </td>
    </tr>
  );
}
