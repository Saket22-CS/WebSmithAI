"use client"

import { Button } from '@/components/ui/button'
import { ArrowUp, ImagePlus } from 'lucide-react'
import React, { useState } from 'react'
import { LayoutDashboard, Key , HomeIcon, User} from 'lucide-react'

const Suggestions = [
  {
    label: 'Dashboard',
    prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS.',
    icon: LayoutDashboard
  },
  {
    label: 'SignUp Form',
    prompt: 'Create a modern sign-up form with email/password fields, Google and GitHub login options, and a terms checkbox.',
    icon: Key
  },
  {
    label: 'Hero',
    prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effect, subtitle, CTA, small social proof, and an image.',
    icon: HomeIcon
  },
  {
    label: 'User Profile Card',
    prompt: 'Create a modern user profile card component for a social media website.',
    icon: User
  },
];


const Hero = () => {

    const [userInput, setUserInput] = useState<string>('');

  return (
    <div className='flex flex-col items-center justify-center h-[80vh] text-center'>
        <h2 className='font-bold text-6xl'>What Should We Design? </h2>
        <p className='mt-2 text-xl text-gray-500'>Generate, Edit and Explore design with AI, Export code as well</p>
    
        <div className='w-full max-w-2xl p-5 border mt-5 rounded-2xl'>
            <textarea placeholder='Describe your idea here...'
            value={userInput}
            onChange={(event) => setUserInput(event.target.value)}
                className='w-full h-24 focus:outline-none focus:ring-0 resize-none' 
            />
            <div className='flex justify-between items-center'>  
                <Button variant={'ghost'}> <ImagePlus/> </Button>
                <Button> <ArrowUp/> </Button>
            </div>
        </div>

        <div className='mt-4 flex gap-3'> 
            {Suggestions.map((Suggestion,index) => (
                <Button variant={'outline'} key={index}
                onClick={() => setUserInput(Suggestion.prompt)} 
                >
                    <Suggestion.icon size={18}/>
                    <span>{Suggestion.label}</span>
                    </Button>
            ))}   

        </div>
    
    </div>
    
  )
}

export default Hero