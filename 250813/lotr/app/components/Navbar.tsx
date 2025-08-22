import Link from 'next/link';

const Navbar = () => {
  return (
    <div>
      <Link href={'/'} className='mr-10'>
        HOME
      </Link>
      <Link href={'/volumes'} className='mr-10'>
        VOLUMES
      </Link>
      <Link href={'/volumes/create'}>CREATE NEW</Link>
    </div>
  );
};

export default Navbar;
