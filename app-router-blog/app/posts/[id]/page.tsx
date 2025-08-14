import fetchSinglePost from '@/app/fetchSinglePost';
import { Post } from '@/app/types/Post';
import LikesComponent from './LikesComponent';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PostDetailsPage = async ({ params }: { params: any }) => {
  const post: Post = await fetchSinglePost(params.id);

  return (
    <div className='max-w-4xl mx-auto flex flex-col gap-y-10'>
      <h1 className='text-center font-bold text-2xl'>{post.title}</h1>
      <p>{post.body}</p>
      <LikesComponent />
    </div>
  );
};

export default PostDetailsPage;
