import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { ArrowRight } from "lucide-react"
import AnimatedAvatar from "@/components/animated-avatar"
import SignatureHeadshot from "@/components/signature-headshot"
import { Mail, Phone } from "lucide-react"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <main className="min-h-screen bg-gradient-to-br from-periwinkle to-misty-rose relative overflow-hidden">
        {/* Decorative clouds */}
        <div className="absolute top-40 left-20 w-64 h-64 bg-white rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-champagne rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-[30%] right-[20%] w-40 h-40 bg-white rounded-full opacity-30 blur-3xl"></div>

        {/* Navigation */}
        <nav className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <Link href="/">
                <div style={{ transform: "scale(0.8)", transformOrigin: "left center" }}>
                  <Logo size="large" variant="dark" /> {/* Using the dark variant here, 20% smaller */}
                </div>
              </Link>
            </div>

            <div className="hidden md:flex items-center space-x-2 bg-white/20 rounded-full p-1 absolute left-1/2 transform -translate-x-1/2">
              <Link href="/avatars">
                <div className="px-4 py-2 rounded-full transition-all hover:bg-periwinkle hover:text-english-violet">
                  Avatars
                </div>
              </Link>
              <Link href="/signatures">
                <div className="px-4 py-2 rounded-full transition-all hover:bg-misty-rose hover:text-english-violet">
                  Signatures
                </div>
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-end space-x-4">
              <Button className="bg-black hover:bg-black/90 text-white rounded-full px-6">Get Started</Button>

              {/* Mobile menu button - only visible on small screens */}
              <button className="md:hidden p-2 rounded-md hover:bg-white/20">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="heading-xl text-english-violet mb-6">Bring your emails to life with animation.</h1>
            <p className="text-xl md:text-2xl mb-10 text-english-violet/80 max-w-2xl mx-auto">
              Stand out in crowded inboxes with animated email elements that create memorable brand impressions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Link href="/avatars">
                <Button className="bg-english-violet hover:bg-english-violet/90 text-white rounded-full px-8 py-6 text-lg">
                  Explore Products <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-english-violet text-english-violet rounded-full px-8 py-6 text-lg"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Showcase */}
          <div className="relative mt-8">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              {/* Avatar mockup - browser style instead of phone */}
              <Link href="/avatars" className="relative transform hover:scale-105 transition-transform duration-300">
                {/* Decorative elements - moved behind and scaled up 30% */}
                <div
                  className="absolute -bottom-4 -right-4 w-26 h-26 bg-periwinkle rounded-full opacity-70"
                  style={{ width: "13rem", height: "13rem", transform: "scale(1.4)", zIndex: 0 }}
                ></div>
                <div
                  className="absolute -top-4 -left-4 w-20 h-20 bg-champagne rounded-full opacity-70"
                  style={{ width: "10.4rem", height: "10.4rem", transform: "scale(1.2)", zIndex: 0 }}
                ></div>

                <div className="w-[320px] bg-white rounded-xl shadow-xl overflow-hidden relative z-10">
                  {/* Browser header */}
                  <div className="bg-periwinkle p-3 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="mx-auto bg-white/20 rounded-full px-4 py-1 text-xs text-white">Gmail</div>
                  </div>

                  {/* Email content */}
                  <div className="p-4">
                    {/* Email with animated avatar */}
                    <div className="border-b pb-3 mb-3">
                      <div className="flex items-start">
                        <div className="mr-3 flex-shrink-0">
                          <AnimatedAvatar size="sm" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <div className="font-bold text-sm">Lumio Team</div>
                            <div className="text-xs text-gray-500">10:30 AM</div>
                          </div>
                          <div className="text-sm font-medium mb-1">Welcome to Email Tokens!</div>
                          <div className="text-xs text-gray-500 line-clamp-2">
                            Thank you for your interest in our animated email solutions...
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Regular emails */}
                    {[1, 2].map((i) => (
                      <div key={i} className="border-b pb-3 mb-3">
                        <div className="flex items-start">
                          <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div className="font-bold text-sm">Sender Name</div>
                              <div className="text-xs text-gray-500">{`${i + 8}:${i * 15} AM`}</div>
                            </div>
                            <div className="text-sm font-medium mb-1">Email Subject Line</div>
                            <div className="text-xs text-gray-500 line-clamp-1">
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="bg-periwinkle/30 p-2 text-center text-xs text-english-violet font-medium">
                    Animated Email Avatars
                  </div>
                </div>
              </Link>

              {/* Signature mockup - browser style instead of phone */}
              <Link href="/signatures" className="relative transform hover:scale-105 transition-transform duration-300">
                {/* Decorative elements - moved behind and scaled up 30% */}
                <div
                  className="absolute -bottom-4 -left-4 w-26 h-26 bg-misty-rose rounded-full opacity-70"
                  style={{ width: "13rem", height: "13rem", transform: "scale(1)", zIndex: 0 }}
                ></div>
                <div
                  className="absolute -top-4 -right-4 w-20 h-20 bg-champagne rounded-full opacity-70"
                  style={{ width: "10.4rem", height: "10.4rem", transform: "scale(1)", zIndex: 0 }}
                ></div>

                <div className="w-[320px] bg-white rounded-xl shadow-xl overflow-hidden relative z-10">
                  {/* Browser header */}
                  <div className="bg-misty-rose p-3 flex items-center">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <div className="mx-auto bg-white/20 rounded-full px-4 py-1 text-xs text-english-violet">
                      Email Compose
                    </div>
                  </div>

                  {/* Email compose with signature */}
                  <div className="p-4">
                    <div className="mb-2">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="text-xs font-medium text-gray-500">To:</div>
                        <div className="text-xs">client@example.com</div>
                      </div>
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="text-xs font-medium text-gray-500">Subject:</div>
                        <div className="text-xs font-medium">Project Proposal</div>
                      </div>
                    </div>

                    <div className="text-xs mb-4">
                      <p className="mb-2">Hi there,</p>
                      <p className="mb-2">Thanks for your interest. I've attached the information for your review.</p>
                      <p>Looking forward to our collaboration!</p>
                    </div>

                    {/* Email signature - updated to match other signatures */}
                    <div className="border-t pt-3">
                      <div className="flex items-start">
                        <div className="mr-3 flex-shrink-0 flex flex-col items-center">
                          {/* Larger GIF */}
                          <SignatureHeadshot size="md" className="mb-2" />

                          {/* Social icons below the GIF */}
                          <div className="flex items-center space-x-1.5">
                            <div className="w-4 h-4 bg-english-violet/80 rounded-full flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                              </svg>
                            </div>
                            <div className="w-4 h-4 bg-english-violet/80 rounded-full flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                <rect x="2" y="9" width="4" height="12"></rect>
                                <circle cx="4" cy="4" r="2"></circle>
                              </svg>
                            </div>
                            <div className="w-4 h-4 bg-english-violet/80 rounded-full flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                              </svg>
                            </div>
                            <div className="w-4 h-4 bg-english-violet/80 rounded-full flex items-center justify-center">
                              <svg
                                className="h-2.5 w-2.5 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                              </svg>
                            </div>
                          </div>
                        </div>

                        <div className="flex-1">
                          <div className="font-bold text-english-violet text-xs">SARAH JOHNSON</div>
                          <div className="text-xs text-gray-600">Marketing Director // Lumio</div>
                          <div className="flex items-center text-xs text-gray-600 mt-1">
                            <Mail className="h-3 w-3 mr-1" />
                            <span>sarah@lumio.com</span>
                          </div>
                          <div className="flex items-center text-xs text-gray-600">
                            <Phone className="h-3 w-3 mr-1" />
                            <span>(555) 123-4567</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">Create memorable email experiences</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-misty-rose/30 p-2 text-center text-xs text-english-violet font-medium">
                    Animated Email Signatures
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </main>

      {/* Feature Cards Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="heading-lg text-english-violet mb-6">
              Unlock the full potential of your email communications
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Make every email an opportunity to strengthen your brand and engage your audience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-periwinkle/40 rounded-3xl p-8 transition-all hover:shadow-lg">
              <div className="bg-periwinkle/60 rounded-2xl p-4 mb-6 w-full h-48 flex items-center justify-center">
                <AnimatedAvatar size="lg" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-english-violet">Eye-Catching</h3>
              <p className="text-gray-700">
                Stand out in crowded inboxes with animated elements that capture attention immediately.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-champagne/40 rounded-3xl p-8 transition-all hover:shadow-lg">
              <div className="bg-champagne/60 rounded-2xl p-4 mb-6 w-full h-48 flex items-center justify-center">
                <div className="w-full max-w-[220px] bg-white rounded-lg shadow-md p-4">
                  <div className="flex flex-col items-center">
                    {/* Signature headshot */}
                    <SignatureHeadshot size="sm" className="mb-2" />

                    {/* Simplified social icons */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="w-3 h-3 bg-english-violet/60 rounded-full"></div>
                      <div className="w-3 h-3 bg-english-violet/60 rounded-full"></div>
                      <div className="w-3 h-3 bg-english-violet/60 rounded-full"></div>
                      <div className="w-3 h-3 bg-english-violet/60 rounded-full"></div>
                    </div>

                    {/* Abstract text elements */}
                    <div className="w-full space-y-2">
                      <div className="h-2.5 w-24 bg-english-violet/20 rounded-full mx-auto"></div>
                      <div className="h-2 w-32 bg-english-violet/10 rounded-full mx-auto"></div>
                      <div className="h-2 w-28 bg-english-violet/10 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-english-violet">Professional</h3>
              <p className="text-gray-700">
                Elevate your brand with polished animations that reflect your company's quality and attention to detail.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-misty-rose/40 rounded-3xl p-8 transition-all hover:shadow-lg">
              <div className="bg-misty-rose/60 rounded-2xl p-4 mb-6 w-full h-48 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -top-3 -left-3 w-12 h-12 bg-periwinkle rounded-full"></div>
                  <div className="relative z-10 w-16 h-16 bg-misty-rose rounded-full flex items-center justify-center">
                    <span className="text-english-violet font-bold text-xl">+</span>
                  </div>
                </div>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-english-violet">Memorable</h3>
              <p className="text-gray-700">
                Create lasting impressions that help recipients remember your brand long after they've read your email.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Side by Side Section */}
      <section className="py-24 bg-seasalt">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2 relative">
              <div className="absolute -top-6 -left-6 w-full h-full bg-periwinkle/30 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl shadow-xl p-6 z-10">
                <div className="w-full h-[500px] bg-periwinkle/10 rounded-2xl flex items-center justify-center">
                  <div className="w-[320px] bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Browser header */}
                    <div className="bg-periwinkle p-3 flex items-center">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="mx-auto bg-white/20 rounded-full px-4 py-1 text-xs text-white">Gmail</div>
                    </div>

                    {/* Email content */}
                    <div className="p-4">
                      {/* Email with animated avatar */}
                      <div className="border-b pb-3 mb-3">
                        <div className="flex items-start">
                          <div className="mr-3 flex-shrink-0">
                            <AnimatedAvatar size="sm" />
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between mb-1">
                              <div className="font-bold text-sm">Lumio Team</div>
                              <div className="text-xs text-gray-500">10:30 AM</div>
                            </div>
                            <div className="text-sm font-medium mb-1">Welcome to Email Tokens!</div>
                            <div className="text-xs text-gray-500 line-clamp-2">
                              Thank you for your interest in our animated email solutions...
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Regular emails */}
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="border-b pb-3 mb-3 last:mb-0 last:border-0">
                          <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-gray-200 mr-3 flex-shrink-0"></div>
                            <div className="flex-1">
                              <div className="flex justify-between mb-1">
                                <div className="font-bold text-sm">Sender Name</div>
                                <div className="text-xs text-gray-500">{`${i + 8}:${i * 15} AM`}</div>
                              </div>
                              <div className="text-sm font-medium mb-1">Email Subject Line</div>
                              <div className="text-xs text-gray-500 line-clamp-1">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-periwinkle/30 p-2 text-center text-xs text-english-violet font-medium">
                      Animated Email Avatars
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:w-1/2">
              <h2 className="text-4xl font-bold mb-6 text-english-violet">
                Enhance your brand with every email you send
              </h2>
              <p className="text-lg text-gray-700 mb-8">
                Your team sends thousands of emails each year. Each one is an opportunity to reinforce your brand and
                create a memorable impression.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-periwinkle flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-english-violet"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-english-violet mb-1">Stand out in crowded inboxes</h3>
                    <p className="text-gray-700">
                      Animated elements catch the eye and make your emails more likely to be opened and read.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-champagne flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-english-violet"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-english-violet mb-1">Reinforce brand recognition</h3>
                    <p className="text-gray-700">
                      Consistent, animated branding helps recipients instantly recognize your communications.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-misty-rose flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-4 h-4 text-english-violet"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-english-violet mb-1">Increase engagement</h3>
                    <p className="text-gray-700">
                      Dynamic elements create a more engaging experience that encourages interaction with your content.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Link href="/avatars">
                  <Button className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 text-lg">
                    Get Started <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-periwinkle to-misty-rose relative overflow-hidden">
        {/* Decorative clouds */}
        <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-champagne rounded-full opacity-30 blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-english-violet">
              Ready to transform your email communications?
            </h2>
            <p className="text-xl text-english-violet/80 mb-10 max-w-2xl mx-auto">
              Join hundreds of businesses already using our animated email solutions to stand out and make lasting
              impressions.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/avatars">
                <Button className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 text-lg">
                  Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#contact">
                <Button
                  variant="outline"
                  className="border-english-violet text-english-violet rounded-full px-8 py-6 text-lg"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
