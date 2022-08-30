import React, { Suspense, StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Spinner } from '@/components/Spinner';
import { MakeZoo } from '@/main/factories/pages/MakeZoo';

const rootElement = document.getElementById('main');
const root = createRoot(rootElement!);

const Zoo = MakeZoo;

root.render(
  <StrictMode>
    <Suspense fallback={<Spinner />}>
      <Zoo />
    </Suspense>
  </StrictMode>,
);
