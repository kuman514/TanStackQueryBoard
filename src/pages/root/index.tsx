import { Outlet } from 'react-router';

import Header from '^/shared/header';

export default function RootLayout() {
  return (
    <main className="w-screen min-h-dvh flex flex-col items-center">
      <Header />
      <div className="pt-20">
        <Outlet />
      </div>
    </main>
  );
}
