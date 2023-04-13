import Link from 'next/link';
import React from 'react';

const Home = () => {
  return (
    <div className="container mx-auto my-10">
      <div className="grid grid-cols-2 gap-6">
        <Link href="/seesaw">
          <div className="aspect-video rounded-xl shadow grid place-content-center">
            <h2 className="font-bold text-2xl">シーソーの理解</h2>
          </div>
        </Link>
        <Link href="/multi-view-observation">
          <div className="aspect-video rounded-xl shadow grid place-content-center">
            <h2 className="font-bold text-2xl">四方観察</h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
