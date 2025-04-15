import Link from "next/link"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { ArrowRight } from "lucide-react"
import AnimatedAvatar from "@/components/animated-avatar"
import SignatureHeadshot from "@/components/signature-headshot"

export default function Home() {
  return (
    <div className="overflow-hidden">
      <main className="min-h-screen bg-gradient-to-br from-periwinkle to-misty-rose relative overflow-hidden">
        {/* Decorative clouds */}
        <div className="absolute top-40 left-20 w-64 h-64 bg-white rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-80 h-80 bg-champagne rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-[30%] right-[20%] w-40 h-40 bg-white rounded-full opacity-30 blur-3xl"></div>

        {/* Navigation */}
        <nav className="container mx-auto px-4 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <Link href="/">
              <Logo size="large" />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/avatars" className="text-english-violet/80 hover:text-english-violet transition-colors">
              Avatars
            </Link>
            <Link href="/signatures" className="text-english-violet/80 hover:text-english-violet transition-colors">
              Signatures
            </Link>
            <Link href="#pricing" className="text-english-violet/80 hover:text-english-violet transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-4">
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
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h1 className="heading-xl text-english-violet mb-6">
              Bring your emails to
              life with animation.
            </h1>
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
          <div className="relative">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              {/* Avatar mockup */}
              <div className="relative transform rotate-[-8deg]">
                <div className="w-[280px] h-[560px] bg-periwinkle rounded-[40px] p-3 shadow-xl">
                  <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-[60px] bg-periwinkle flex items-center justify-center">
                      <div className="w-32 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="pt-16 px-4 flex flex-col items-center">
                      <AnimatedAvatar size="lg" className="mb-4" />
                      <div className="w-full h-6 bg-gray-100 rounded-full mb-2"></div>
                      <div className="w-3/4 h-4 bg-gray-100 rounded-full mb-6"></div>
                      <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
                      <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
                      <div className="w-full h-32 bg-gray-100 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Signature mockup */}
              <div className="relative transform rotate-[8deg]">
                <div className="w-[280px] h-[560px] bg-misty-rose rounded-[40px] p-3 shadow-xl">
                  <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-[60px] bg-misty-rose flex items-center justify-center">
                      <div className="w-32 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="pt-16 px-4 flex flex-col items-center">
                      <div className="w-full h-40 bg-gray-100 rounded-xl mb-6"></div>
                      <div className="w-full p-4 bg-misty-rose/30 rounded-xl mb-6">
                        <div className="flex items-start space-x-3">
                          <SignatureHeadshot size="xs" />
                          <div className="flex-1">
                            <div className="h-4 w-32 bg-english-violet/20 rounded-full mb-2"></div>
                            <div className="h-3 w-40 bg-english-violet/10 rounded-full mb-1"></div>
                            <div className="h-3 w-24 bg-english-violet/10 rounded-full"></div>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
                      <div className="w-full h-32 bg-gray-100 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
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
                <div className="w-full max-w-[180px] h-20 bg-white rounded-lg shadow-md p-3">
                  <div className="flex items-center space-x-3">
                    <SignatureHeadshot size="xs" />
                    <div>
                      <div className="h-3 w-24 bg-english-violet/20 rounded-full"></div>
                      <div className="h-2 w-32 bg-english-violet/10 rounded-full mt-2"></div>
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
                  <div className="w-[280px] h-[560px] bg-periwinkle rounded-[40px] p-3 shadow-lg transform -rotate-6">
                    <div className="w-full h-full bg-white rounded-[32px] overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-[60px] bg-periwinkle flex items-center justify-center">
                        <div className="w-32 h-8 bg-white/20 rounded-full"></div>
                      </div>
                      <div className="pt-16 px-4 flex flex-col items-center">
                        <AnimatedAvatar size="lg" className="mb-4" />
                        <div className="w-full h-6 bg-gray-100 rounded-full mb-2"></div>
                        <div className="w-3/4 h-4 bg-gray-100 rounded-full mb-6"></div>
                        <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
                        <div className="w-full h-32 bg-gray-100 rounded-xl mb-4"></div>
                        <div className="w-full h-32 bg-gray-100 rounded-xl"></div>
                      </div>
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
