import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Image from 'next/image'
import path from 'path'
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
          <Button>Get Started <ArrowRight/> </Button>
        </div>


    </div>
  )
}

export default Header