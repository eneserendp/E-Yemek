import { Pacifico } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

const pacifico = Pacifico({
    weight: '400',
    preload: false,
});

const Logo = () => {
    return (
        <Link href="/" className={`${pacifico.className} flex items-center text-2xl w-auto`}>
            <img src="/perilogo3.png" alt="Logo" className="h-20 " />
            Perinin Yeri
        </Link>
    );
}

export default Logo;
