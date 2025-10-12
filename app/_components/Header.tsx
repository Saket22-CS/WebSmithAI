"use client"

import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { useUser } from "@clerk/nextjs";
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'

const MenuOptions = [
    {
        name: 'Pricing',
        path: '/pricing'
    },
    {
        name: 'Contact us',
        path: '/contact-us'
    },
]

const Header = () => {
  const { user} = useUser();
  return (
    <div className='flex items-center justify-between p-4 shadow'>
        <div className='flex gap-2 items-center'>
            <Image src={'/logo.svg'} alt="Logo" width={35} height={35} />
            <h2 className='font-bold text-xl'>WebSmithAI</h2>
        </div>
        <div className='flex gap-4'>
          {MenuOptions.map((menu,index) => (
            <Button variant={'ghost'} key={index}>{menu.name}</Button>
          ))}
        </div>

        <div>
          {!user ? <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
            <Button>Get Started <ArrowRight/> </Button>
          </SignInButton>
          :
          <Link href={'/workspace'}>
            <Button>Get Started <ArrowRight/> </Button>
          </Link>
          }
        </div>
    </div>
  )
}

export default Header