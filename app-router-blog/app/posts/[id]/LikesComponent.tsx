'use client';

import { useState } from 'react';

const LikesComponent = () => {
  const [likes, setLikes] = useState<number>(0);

  return (
    <>
      {likes > 0 && (
        <div>
          <h2 className='text-lg'>
            Likes: <span className='font-bold'>{likes}</span>
          </h2>
        </div>
      )}
      <div className='w-30'>
        {likes < 1 ? (
          <button
            className={`bg-white text-black border border-black rounded-lg w-full p-1`}
            onClick={() => setLikes(1)}
          >
            like post
          </button>
        ) : (
          <button
            className={`text-white bg-blaack border border-white rounded-lg w-full p-1`}
            onClick={() => setLikes(0)}
          >
            unlike post
          </button>
        )}
      </div>
    </>
  );
};
export default LikesComponent;
