import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "small" | "medium" | "large"
}

export default function LogoInline({ className, showText = true, size = "medium" }: LogoProps) {
  // Define size mappings
  const sizes = {
    small: { width: showText ? 120 : 40, height: showText ? 38 : 40 },
    medium: { width: showText ? 160 : 50, height: showText ? 50 : 50 },
    large: { width: showText ? 200 : 60, height: showText ? 63 : 60 },
  }

  const { width, height } = sizes[size]

  return (
    <div className={cn("relative flex items-center", className)}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 348 110"
        xmlns="http://www.w3.org/2000/svg"
        className="object-contain"
      >
        <g>
          {showText && (
            <text
              transform="translate(141.1 76.68)"
              fill="#141416"
              fontFamily="PlayfairDisplay-Bold, 'Playfair Display'"
              fontSize="69"
              fontWeight="700"
            >
              <tspan x="0" y="0">
                Lumio
              </tspan>
            </text>
          )}
          <path
            fill="#d5ccff"
            d="M108.8,18.62c-1.19-10.67-6.72-16.11-17.41-17.33C76.96-.36,29.82-.63,16.09,1.65,7.72,3.04,2.66,8.95,1.48,17.25c-2.07,14.56-1.81,58.74-.14,73.75.86,7.71,3.68,13.26,11.29,15.89,8.31,2.88,67.51,2.69,78.77,1.44,7.74-.86,13.31-3.67,15.96-11.24,2.89-8.27,2.7-67.25,1.45-78.47ZM94.95,56.86c-20.62-.72-38.23,17.27-37.85,37.71h-4.53c.72-20.54-17.34-38.09-37.85-37.71v-4.51c20.98.69,37.83-17.32,37.85-37.71h4.53c-.72,20.54,17.34,38.09,37.85,37.71v4.51Z"
          />
        </g>
      </svg>
    </div>
  )
}
