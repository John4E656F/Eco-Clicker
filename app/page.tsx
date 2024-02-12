'use client';
import React, { useState } from 'react';
import { Clicker } from '@/components/clicker';

export default function Home() {
  const [count, setCount] = useState(0);

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <Clicker />
    </main>
  );
}
