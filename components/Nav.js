import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/public/logo.svg';
import Home from '@/public/icon-nav-home.svg';
import Movie from '@/public/icon-nav-movies.svg';
import Serie from '@/public/icon-nav-tv-series.svg';
import Bookmark from '@/public/icon-nav-bookmark.svg';
import Avatar from '@/public/image-avatar.png';
export default function Nav() {
  return (
    <nav className="flex items-center justify-between bg-secondary p-5 text-white sm:mx-10 sm:mt-5 sm:rounded-md">
      <div>
        <Link href={'/'}>
          <Image src={Logo} alt="logo" width={33} height={27} priority />
        </Link>
      </div>
      <ul className="flex items-center gap-3">
        <li>
          <Link href={'/'}>
            <Image
              src={Home}
              alt="icon nav-home"
              width={25}
              height={25}
              priority
            />
          </Link>
        </li>
        <li>
          <Link href={'/movies'}>
            <Image
              src={Movie}
              alt="icon nav-movie"
              width={25}
              height={25}
              priority
            />
          </Link>
        </li>
        <li>
          <Link href={'/series'}>
            <Image
              src={Serie}
              alt="icon nav-series"
              width={25}
              height={25}
              priority
            />
          </Link>
        </li>
        <li>
          <Link href={'/bookmark'}>
            <Image
              src={Bookmark}
              alt="icon nav-bookmark"
              width={23}
              height={23}
              priority
            />
          </Link>
        </li>
      </ul>
      <div>
        <Image
          src={Avatar}
          alt="image avatar"
          width={32}
          height={32}
          priority
        />
      </div>
    </nav>
  );
}
