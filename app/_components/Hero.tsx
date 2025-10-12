"use client"

import { Button } from '@/components/ui/button'
import React, { useState } from 'react'
import {ArrowUp, ImagePlus, LayoutDashboard, Key , HomeIcon, User, Loader2Icon} from 'lucide-react'
import { SignInButton, useUser } from '@clerk/nextjs'
import axios from 'axios'
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { set } from 'date-fns'

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
    const {user} = useUser();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const CreateNewProject = async() =>{
      setLoading(true);
      const projectId = uuidv4();
      const frameId = generateRamdomFrameNumber();
      const messages = [
        {
          "role": "user",
          content: userInput
        }
      ]

      try {
        const result = await axios.post('/api/projects',{
          projectId: projectId,
          frameId: frameId,
          messages: messages
        });
        console.log(result.data);
        toast.success('Project created successfully');

        router.push(`/playground/${projectId}?frameId=${frameId}`);
        setLoading(false);
      } catch (error) {
        toast.error('Something went wrong');
        console.log(error);  
        setLoading(false);
      }
    }

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
                {!user ? <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
                  <Button disabled={!userInput}> <ArrowUp/> </Button>
                </SignInButton> :

                <Button disabled={!userInput || loading} onClick={CreateNewProject}> 
                  {loading?<Loader2Icon className='animate-spin'/> : <ArrowUp/>} </Button>

                }
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


const generateRamdomFrameNumber = () => {
  const num = Math.floor(Math.random() * 10000);
  return num;
}