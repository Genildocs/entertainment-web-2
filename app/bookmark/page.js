import React from 'react';
import InputSearch from '@/components/InputSearch';
import Motion from '@/components/Motion';
export default function Bookmark() {
  return (
    <div>
      <InputSearch>Search for bookmarked shows</InputSearch>
      <h1 className="headingPages">Bookmarked Movies</h1>
      <Motion />
    </div>
  );
}
