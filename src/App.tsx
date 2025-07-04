import { BrowserRouter, Route, Routes } from 'react-router';

import HomePage from '^/pages/home';
import PostArticlePage from '^/pages/post-article';
import PostTablePage from '^/pages/post-table';
import RootLayout from '^/pages/root';
import CreatePage from './pages/create';
import ModifyPage from './pages/modify';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/create" element={<CreatePage />} />

          <Route path="/posts">
            <Route index element={<PostTablePage />} />
            <Route path=":postId">
              <Route index element={<PostArticlePage />} />
              <Route path="modify" element={<ModifyPage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
