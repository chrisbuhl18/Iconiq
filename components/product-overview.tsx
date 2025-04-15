import { CheckCircle } from "lucide-react"
import AnimatedAvatar from "./animated-avatar"

interface ProductOverviewProps {
  title: string
  description: string
  features: string[]
  image: string
}

export default function ProductOverview({ title, description, features, image }: ProductOverviewProps) {
  return (
    <section id="overview" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto">
              {/* Email app header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                </div>
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
              </div>

              {/* Email app sidebar and content */}
              <div className="flex">
                {/* Sidebar */}
                <div className="w-1/4 pr-4">
                  <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>
                  <div className="space-y-2">
                    <div className="w-full h-6 bg-gray-200 rounded"></div>
                    <div className="w-full h-6 bg-gray-300 rounded"></div>
                    <div className="w-full h-6 bg-gray-200 rounded"></div>
                    <div className="w-full h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>

                {/* Email list */}
                <div className="w-3/4">
                  <div className="w-full h-8 bg-gray-200 rounded mb-4"></div>

                  {/* Email items */}
                  <div className="space-y-3">
                    {/* Highlighted email with colored avatar */}
                    <div className="flex items-center p-3 bg-gray-100 rounded-lg">
                      <div className="mr-3 flex-shrink-0">
                        <AnimatedAvatar size="sm" />
                      </div>
                      <div>
                        <div className="font-medium font-heading">Lumio Team</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <span className="truncate">Welcome to your animated...</span>
                          <span className="ml-2 text-xs">10:30 AM</span>
                        </div>
                      </div>
                    </div>

                    {/* Regular emails (grayscale) */}
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-100 rounded-lg">
                        <div className="w-10 h-10 bg-gray-300 rounded-full mr-3 flex-shrink-0"></div>
                        <div>
                          <div className="font-medium text-gray-700">Sender Name</div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <span className="truncate">Email subject line preview text...</span>
                            <span className="ml-2 text-xs">{`${i + 8}:${i * 15} AM`}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <h2 className="heading-md text-english-violet mb-6">{title}</h2>
            <p className="text-lg mb-8 text-gray-700">{description}</p>
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-english-violet h-6 w-6 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
