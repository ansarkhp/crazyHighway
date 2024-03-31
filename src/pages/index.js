import dynamic from 'next/dynamic';
import React from 'react'

const Homepage = dynamic(() => import('@/Module').then((mod) => mod.Homepage), { ssr: false })

export default function Home() {
  return (
    <Homepage />
  );
}
