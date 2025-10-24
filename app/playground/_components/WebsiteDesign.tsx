import React, { useContext, useEffect, useRef, useState } from 'react'
import WebPageTools from './WebPageTools';
import ElementSettingSection from './ElementSettingSection';
import ImageSettingSection from './ImageSettingSection';
import { OnSaveContext } from '@/context/OnSaveContext';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useSearchParams } from 'next/navigation';

type Props={
  generatedCode:string
}

const HTML_CODE=`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
          <title>AI Website Builder</title>

          <!-- Tailwind CSS -->
          <script src="https://cdn.tailwindcss.com"></script>

          <!-- Flowbite CSS & JS -->
          <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

          <!-- Font Awesome / Lucide -->
          <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

          <script src="https://unpkg.com/lucide@latest"></script>
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">

          <!-- Chart.js -->
          <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>  
      </head>
      <body id="root">
      </body>
      </html>`

        function WebsiteDesign({ generatedCode }: Props) {
        const iframeRef = useRef<HTMLIFrameElement>(null)
        const [selectedScreenSize, setSelectedScreenSize] = useState('web')
        const [selectedElement, setSelectedElement] = useState<HTMLElement | null>(null)
        const {onSaveData,setOnSaveData} = useContext(OnSaveContext)
        const {projectId} = useParams();
        const params = useSearchParams();
        const frameId = params.get('frameId');
        // 1️⃣ Initialize iframe base document
        useEffect(() => {
            if (!iframeRef.current) return
            const doc = iframeRef.current.contentDocument
            if (!doc) return
            doc.open()
            doc.write(HTML_CODE)
            doc.close()
        }, [])

        // 2️⃣ Function to attach selection events
        const attachSelectionHandlers = (doc: Document) => {
            let hoverEl: HTMLElement | null = null
            let selectedElements: HTMLElement[] = []

            const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (hoverEl && hoverEl !== target && !selectedElements.includes(hoverEl)) {
                hoverEl.style.outline = ""
            }
            hoverEl = target
            if (!selectedElements.includes(target)) {
                hoverEl.style.outline = "2px dotted blue"
            }
            }

            const handleMouseOut = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (hoverEl === target && !selectedElements.includes(target)) {
                hoverEl.style.outline = ""
                hoverEl = null
            }
            }

            const handleClick = (e: MouseEvent) => {
            e.preventDefault()
            e.stopPropagation()
            const target = e.target as HTMLElement

            // Shift + click → multi-select
            if (e.shiftKey) {
                if (!selectedElements.includes(target)) {
                target.style.outline = "2px solid green"
                target.setAttribute("contenteditable", "true")
                selectedElements.push(target)
                } else {
                target.style.outline = ""
                target.removeAttribute("contenteditable")
                selectedElements = selectedElements.filter(el => el !== target)
                }
            } else {
                // Normal click → single select
                selectedElements.forEach(el => {
                el.style.outline = ""
                el.removeAttribute("contenteditable")
                })
                selectedElements = []
                target.style.outline = "2px solid red"
                target.setAttribute("contenteditable", "true")
                target.focus()
                selectedElements.push(target)
            }

            setSelectedElement(selectedElements[0] || null)
            }

            const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedElements.length > 0) {
                selectedElements.forEach(el => {
                el.style.outline = ""
                el.removeAttribute("contenteditable")
                })
                selectedElements = []
                setSelectedElement(null)
            }
            }

            // ✅ Attach listeners to body after content is updated
            doc.body.addEventListener("mouseover", handleMouseOver)
            doc.body.addEventListener("mouseout", handleMouseOut)
            doc.body.addEventListener("click", handleClick)
            doc.addEventListener("keydown", handleKeyDown)
        }

        // 3️⃣ Update iframe content and attach handlers after generatedCode changes
        useEffect(() => {
            if (!iframeRef.current) return
            const doc = iframeRef.current.contentDocument
            if (!doc) return
            const root = doc.getElementById("root")
            if (!root) return

            root.innerHTML = generatedCode
            ?.replaceAll("```html", "")
            .replaceAll("```", "")
            .replace("html", "") ?? ""

            // Attach selection logic after HTML updates
            attachSelectionHandlers(doc)
        }, [generatedCode])

        useEffect(()=>{
            onSaveData&&onSaveCode();
        },[onSaveData]);

        const onSaveCode=async()=>{
            if (iframeRef.current) {
                try {
                    const iframeDoc =
                        iframeRef.current.contentDocument ||
                        iframeRef.current.contentWindow?.document;

                    if (iframeDoc) {
                        const cloneDoc = iframeDoc.documentElement.cloneNode(true) as HTMLElement;
                        const AllEls = cloneDoc.querySelectorAll<HTMLElement>("*");
                        AllEls.forEach((el) => {
                            el.style.outline = "";
                            el.style.cursor = "";
                        });
                        const html = cloneDoc.outerHTML;
                        console.log("Saved HTML:", html);

                        const result = await axios.put('/api/frames',{
                            designCode:html,
                            frameId:frameId,
                            projectId:projectId
                            });
                            console.log(result.data)
                            toast.success('Saved!')
                    }
                } catch (error) {
                    console.log("Error saving code:", error);
                }
            }

        }

        return (
            <div className='flex gap-2 w-full'>
            <div className='p-2 w-full flex items-center flex-col'>
                <iframe
                ref={iframeRef}
                className={`${selectedScreenSize === 'web' ? 'w-full' : 'w-120'} h-[630px] border-2 rounded-xl`}
                sandbox="allow-scripts allow-same-origin"
                />
                <WebPageTools
                selectedScreenSize={selectedScreenSize}
                setSelectedScreenSize={(v: string) => setSelectedScreenSize(v)}
                generatedCode={generatedCode}
                />
            </div>

            {/* <ElementSettingSection selectedEl={selectedElement!}clearSelection={() => setSelectedElement(null)}/> */}
            
            {selectedElement?.tagName === 'IMG' ? (
                //@ts-ignore
                <ImageSettingSection selectedEl={selectedElement} />
            ) : selectedElement ? (
                <ElementSettingSection 
                    selectedEl={selectedElement}
                    clearSelection={() => setSelectedElement(null)}
                />
            ) : null}
            </div>
        );
        }

        export default WebsiteDesign