import { BrowserRouter, Route, Routes } from 'react-router';

import RootLayout from '^/pages/root';
import HomePage from './pages/home';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
