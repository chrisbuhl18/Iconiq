import { cn } from "@/lib/utils"
import AnimatedAvatar from "./animated-avatar"
import Image from "next/image"

interface AvatarMockupProps {
  className?: string
}

export default function AvatarMockup({ className }: AvatarMockupProps) {
  return (
    <div className={cn("relative", className)}>
      {/* Desktop version - only visible on md and up */}
      <div className="hidden md:block">
        {/* iPhone frame */}
        <div className="w-[280px] h-[560px] bg-black rounded-[40px] p-3 shadow-xl mx-auto">
          <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[14px] z-10"></div>

            {/* Status bar */}
            <div className="w-full h-[60px] bg-gray-100 flex items-center justify-between px-6 pt-6">
              <div className="text-xs font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Gmail app */}
            <div className="p-4">
              {/* Gmail header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image src="/images/gmail-logo.png" alt="Gmail" width={30} height={30} className="object-contain" />
                  </div>
                  <span className="ml-2 font-medium">Gmail</span>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>

              {/* Search bar */}
              <div className="bg-gray-100 rounded-full py-2 px-4 mb-6 flex items-center">
                <div className="w-4 h-4 bg-gray-400 rounded-full mr-2"></div>
                <div className="text-sm text-gray-400">Search in emails</div>
              </div>

              {/* Email list */}
              <div className="space-y-4">
                {/* Email with avatar */}
                <div className="border-b pb-4">
                  <div className="flex items-start">
                    <div className="mr-3 flex-shrink-0">
                      <AnimatedAvatar size="sm" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-1">
                        <div className="font-bold text-sm">Lumio Team</div>
                        <div className="text-xs text-gray-500">10:30 AM</div>
                      </div>
                      <div className="text-sm font-medium mb-1">Make Memorable Emails!</div>
                      <div className="text-xs text-gray-500 line-clamp-2">
                        Thank you for your interest in our animated email solutions. We're excited to help you stand out
                        in crowded inboxes...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Regular emails */}
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1">
                          <div className="font-bold text-sm">Sender Name</div>
                          <div className="text-xs text-gray-500">{`${i + 8}:${i * 15} AM`}</div>
                        </div>
                        <div className="text-sm font-medium mb-1">Email Subject Line</div>
                        <div className="text-xs text-gray-500 line-clamp-2">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris...
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-14 bg-white border-t flex items-center justify-around px-6">
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
              <div className="w-6 h-6 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-periwinkle rounded-full opacity-70 z-0"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-champagne rounded-full opacity-70 z-0"></div>
      </div>

      {/* Mobile version - only visible below md */}
      <div className="md:hidden">
        {/* iPhone frame - scaled down */}
        <div className="w-[220px] h-[440px] bg-black rounded-[30px] p-2 shadow-xl mx-auto">
          <div className="w-full h-full bg-white rounded-[26px] overflow-hidden relative">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[90px] h-[22px] bg-black rounded-b-[10px] z-10"></div>

            {/* Status bar */}
            <div className="w-full h-[40px] bg-gray-100 flex items-center justify-between px-4 pt-4">
              <div className="text-[10px] font-medium">9:41</div>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
              </div>
            </div>

            {/* Gmail app */}
            <div className="p-3">
              {/* Gmail header */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center">
                    <Image src="/images/gmail-logo.png" alt="Gmail" width={20} height={20} className="object-contain" />
                  </div>
                  <span className="ml-1 text-xs font-medium">Gmail</span>
                </div>
                <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
              </div>

              {/* Search bar */}
              <div className="bg-gray-100 rounded-full py-1 px-3 mb-3 flex items-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full mr-1"></div>
                <div className="text-xs text-gray-400">Search</div>
              </div>

              {/* Email list - simplified */}
              <div className="space-y-2">
                {/* Email with avatar */}
                <div className="border-b pb-2">
                  <div className="flex items-start">
                    <div className="mr-2 flex-shrink-0">
                      <AnimatedAvatar size="xs" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between mb-0.5">
                        <div className="font-bold text-xs">Lumio Team</div>
                        <div className="text-[10px] text-gray-500">10:30 AM</div>
                      </div>
                      <div className="text-xs font-medium mb-0.5">Welcome to Email Tokens!</div>
                      <div className="text-[10px] text-gray-500 line-clamp-1">
                        Thank you for your interest in our animated email solutions...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Just two regular emails for mobile */}
                {[1, 2].map((i) => (
                  <div key={i} className="border-b pb-2">
                    <div className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-gray-200 mr-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-0.5">
                          <div className="font-bold text-xs">Sender Name</div>
                          <div className="text-[10px] text-gray-500">{`${i + 8}:${i * 15} AM`}</div>
                        </div>
                        <div className="text-xs font-medium mb-0.5">Email Subject</div>
                        <div className="text-[10px] text-gray-500 line-clamp-1">Lorem ipsum dolor sit amet...</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom navigation */}
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-white border-t flex items-center justify-around px-4">
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
              <div className="w-4 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>

        {/* Decorative elements - scaled down */}
        <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-periwinkle rounded-full opacity-70 z-0"></div>
        <div className="absolute -top-3 -left-3 w-12 h-12 bg-champagne rounded-full opacity-70 z-0"></div>
      </div>
    </div>
  )
}
