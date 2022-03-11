import React from 'react'
import dynamic from 'next/dynamic';
export default function amir() {
  const StaticFrontEndMap = dynamic(
    () => import("../../src/page-blocks/businessID/StaticMap"), // replace '@components/map' with your component's location
    { ssr: false } // prevents server-side render
  );
  return (
    <StaticFrontEndMap/>
  )
}
