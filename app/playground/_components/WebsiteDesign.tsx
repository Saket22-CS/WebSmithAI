import React, { useEffect, useRef, useState } from 'react'
import WebPageTools from './WebPageTools';

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
        const iframeRef = useRef<HTMLIFrameElement>(null);
        const [selectedScreenSize,setSelectedScreenSize]=useState('web');

        // Initialize iframe shell once
    useEffect(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(HTML_CODE);
        doc.close();

        let hoverEl: HTMLElement | null = null;
        let selectedEl: HTMLElement | null = null;



        const handleMouseOver = (e: MouseEvent) => {
            if (selectedEl) return;
            const target = e.target as HTMLElement;
            if (hoverEl && hoverEl !== target) {
                hoverEl.style.outline = "";
            }
            hoverEl = target;
            hoverEl.style.outline = "2px dotted blue";
        };

        const handleMouseOut = (e: MouseEvent) => {
            if (selectedEl) return;
            if (hoverEl) {
                hoverEl.style.outline = "";
                hoverEl = null;
            }
        };

        const handleClick = (e: MouseEvent) => {
            e.preventDefault();
            e.stopPropagation();
            const target = e.target as HTMLElement;

            if (selectedEl && selectedEl !== target) {
                selectedEl.style.outline = "";
                selectedEl.removeAttribute("contenteditable");
            }

            selectedEl = target;
            selectedEl.style.outline = "2px solid red";
            selectedEl.setAttribute("contenteditable", "true");
            selectedEl.focus();
            console.log("Selected element:", selectedEl);

        };

        const handleBlur = () => {
            if (selectedEl) {
                console.log("Final edited element:", selectedEl.outerHTML);
            }
        };


        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape" && selectedEl) {
                selectedEl.style.outline = "";
                selectedEl.removeAttribute("contenteditable");
                selectedEl.removeEventListener("blur", handleBlur);
                selectedEl = null;
            }
        };

        doc.body?.addEventListener("mouseover", handleMouseOver);
        doc.body?.addEventListener("mouseout", handleMouseOut);
        doc.body?.addEventListener("click", handleClick);
        doc?.addEventListener("keydown", handleKeyDown);

        // Cleanup on unmount
        return () => {
            doc.body?.removeEventListener("mouseover", handleMouseOver);
            doc.body?.removeEventListener("mouseout", handleMouseOut);
            doc.body?.removeEventListener("click", handleClick);
            doc?.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    // Update body only when code changes
    useEffect(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        const root = doc.getElementById("root");
        if (root) {
            root.innerHTML =
                generatedCode
                    ?.replaceAll("```html", "")
                    .replaceAll("```", "")
                    .replace("html", "") ?? "";
        }
    }, [generatedCode]);

    return (
      <div className='p-5 w-full flex items-center flex-col'>
        <iframe
            ref={iframeRef}
            className={`${selectedScreenSize=='web'? 'w-full':'w-120' } h-[630px] border-2 rounded-xl`}
            sandbox="allow-scripts allow-same-origin"
        />
        <WebPageTools selectedScreenSize={selectedScreenSize}
        setSelectedScreenSize={(v:string)=>setSelectedScreenSize(v)}
        generatedCode={generatedCode}
        />
      </div>
    );
}

export default WebsiteDesign