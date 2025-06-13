import { PostTableRow } from '^/entities/post/table-row';

export default function PostTablePage() {
  /**
   * @todo
   * Get post list using useInfiniteQuery
   */

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
        <tbody>
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
          <PostTableRow
            post={{
              id: '123',
              content: '코이시 이쁜 애기!!!',
            }}
          />
        </tbody>
      </table>
    </section>
  );
}
