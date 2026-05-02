import type { ReactNode } from 'react';

type LayoutProps = {
  sidebar: ReactNode;
  main: ReactNode;
  keyboard: ReactNode;
};

export function Layout({ sidebar, main, keyboard }: LayoutProps) {
  return (
    <div className="app-shell">
      {sidebar}
      <main className="main-area">{main}</main>
      {keyboard}
    </div>
  );
}
