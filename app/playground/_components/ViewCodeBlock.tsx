import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';

function ViewCodeBlock({children,code}:any) {

    const handleCopy=async()=>{
        await navigator.clipboard.writeText(code);
        toast.success('Code Copied!')
    }

  return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent className='min-w-7xl max-h-[600px] overflow-auto'>
                <DialogHeader>
                <DialogTitle>
                    <div className='flex items-center gap-4'>
                        Source Code
                        <Button onClick={handleCopy}> <Copy/></Button>
                    </div>
                    </DialogTitle>
                <DialogDescription asChild>
                    <div>
                        <SyntaxHighlighter>
                            {code}
                        </SyntaxHighlighter>
                    </div>
                </DialogDescription>
                </DialogHeader>
            </DialogContent>
         </Dialog>
  )
}

export default ViewCodeBlock