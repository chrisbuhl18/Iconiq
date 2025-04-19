import { cn } from "@/lib/utils"

interface GmailOnlyBadgeProps {
  className?: string
}

export default function GmailOnlyBadge({ className }: GmailOnlyBadgeProps) {
  return (
    <div
      className={cn(
        "block w-fit mx-auto md:mx-0 md:inline-flex items-center px-2 py-1 rounded-full bg-red-100 text-red-700 text-xs font-medium",
        className,
      )}
    >
      <span className="mr-1">Gmail</span>
      <span>Only</span>
    </div>
  )
}
