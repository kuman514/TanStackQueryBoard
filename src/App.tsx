import { BrowserRouter, Route, Routes } from 'react-router';

import HomePage from '^/pages/home';
import PostTablePage from '^/pages/post-table';
import RootLayout from '^/pages/root';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />

          <Route path="/posts">
            <Route index element={<PostTablePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
