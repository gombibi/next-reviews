import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function ReviewsRayout({ children }: LayoutProps) {
  return (
    <div style={{ display: 'flex' }}>
      <div>{children}</div>
    </div>
  );
}
