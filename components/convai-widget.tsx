"use client"

import Script from "next/script"
import { useState, useEffect } from "react"

export default function ConvaiWidget() {
  const [scriptLoaded, setScriptLoaded] = useState(false)

  // Handle script load event
  const handleScriptLoad = () => {
    console.log("ElevenLabs Convai script loaded successfully")
    setScriptLoaded(true)
  }

  // Add the custom element after the script has loaded
  useEffect(() => {
    if (scriptLoaded) {
      try {
        // Check if the element already exists
        if (!document.querySelector("elevenlabs-convai")) {
          // Create the custom element
          const convaiElement = document.createElement("div")
          convaiElement.innerHTML = '<elevenlabs-convai agent-id="exvULGYRnWVefcFtyO6w"></elevenlabs-convai>'
          document.body.appendChild(convaiElement)

          console.log("ElevenLabs Convai element added to the page")

          // Cleanup function
          return () => {
            if (document.body.contains(convaiElement)) {
              document.body.removeChild(convaiElement)
            }
          }
        }
      } catch (error) {
        console.error("Error adding ElevenLabs Convai element:", error)
      }
    }
  }, [scriptLoaded])

  return (
    <>
      <Script
        src="https://elevenlabs.io/convai-widget/index.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={(e) => console.error("Script failed to load", e)}
        id="elevenlabs-convai-script"
      />
    </>
  )
}
