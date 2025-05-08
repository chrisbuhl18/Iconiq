"use client"

import { useEffect } from "react"

export default function ConvaiWidget() {
  useEffect(() => {
    // Create and append the script element
    const script = document.createElement("script")
    script.src = "https://elevenlabs.io/convai-widget/index.js"
    script.async = true
    script.type = "text/javascript"
    document.body.appendChild(script)

    // Create and append the custom element
    const convaiElement = document.createElement("elevenlabs-convai")
    convaiElement.setAttribute("agent-id", "exvULGYRnWVefcFtyO6w")
    document.body.appendChild(convaiElement)

    // Cleanup function to remove elements when component unmounts
    return () => {
      document.body.removeChild(script)
      if (document.body.contains(convaiElement)) {
        document.body.removeChild(convaiElement)
      }
    }
  }, [])

  // This component doesn't render anything visible
  return null
}
