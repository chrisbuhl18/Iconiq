import { CheckCircle, Mail, Phone, Facebook, Linkedin, Instagram, Twitter } from "lucide-react"
import SignatureHeadshot from "./signature-headshot"

interface SignatureProductOverviewProps {
  title: string
  description: string
  features: string[]
  image: string
}

export default function SignatureProductOverview({
  title,
  description,
  features,
  image,
}: SignatureProductOverviewProps) {
  return (
    <section id="overview" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          {/* Mockup - First in DOM for desktop, but second on mobile */}
          <div className="flex-1 md:block order-2 md:order-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              {/* Email app header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                </div>
                <div className="w-32 h-5 bg-gray-200 rounded"></div>
              </div>

              {/* Email compose interface for signature */}
              <div className="border rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <div className="text-xs font-medium text-gray-500">To:</div>
                    <div className="text-xs">client@example.com</div>
                  </div>
                  <div className="text-xs text-gray-500">10:30 AM</div>
                </div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="text-xs font-medium text-gray-500">Subject:</div>
                  <div className="text-xs font-medium">Project Proposal</div>
                </div>
                <div className="text-xs mb-4">
                  <p className="mb-2">Hi there,</p>
                  <p className="mb-2">
                    I'm sending over the proposal we discussed yesterday. Please let me know if you have any questions.
                  </p>
                  <p>Best regards,</p>
                </div>

                {/* Email signature */}
                <div className="border-t pt-4">
                  <div className="flex items-start">
                    {/* Left column with animated headshot and social icons */}
                    <div className="mr-5 flex-shrink-0 flex flex-col items-center">
                      {/* Animated headshot - same size as hero mockup */}
                      <SignatureHeadshot size="md" className="mb-3" />

                      {/* Social icons below the GIF */}
                      <div className="flex items-center space-x-2">
                        <div className="w-5 h-5 bg-english-violet/80 rounded-full flex items-center justify-center">
                          <Facebook className="h-3 w-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-english-violet/80 rounded-full flex items-center justify-center">
                          <Linkedin className="h-3 w-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-english-violet/80 rounded-full flex items-center justify-center">
                          <Instagram className="h-3 w-3 text-white" />
                        </div>
                        <div className="w-5 h-5 bg-english-violet/80 rounded-full flex items-center justify-center">
                          <Twitter className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Right column with signature text */}
                    <div className="flex flex-col space-y-2">
                      <div className="font-bold text-english-violet text-base">SARAH JOHNSON</div>
                      <div className="text-sm text-gray-600">Marketing Director // Lumio</div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Mail className="h-4 w-4 mr-2" />
                        <span>sarah@golumio.co</span>
                      </div>

                      <div className="flex items-center text-sm text-gray-600">
                        <Phone className="h-4 w-4 mr-2" />
                        <span>(555) 123-4567</span>
                      </div>

                      <div className="text-sm text-gray-500">Create memorable email experiences</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email toolbar */}
              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <div className="w-20 h-8 bg-english-violet rounded-md"></div>
                  <div className="w-20 h-8 bg-gray-200 rounded-md"></div>
                </div>
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Text content - Second in DOM for desktop, but first on mobile */}
          <div className="flex-1 mb-8 md:mb-0 order-1 md:order-2">
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
