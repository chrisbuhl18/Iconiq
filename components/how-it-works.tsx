interface Step {
  title: string
  description: string
}

interface HowItWorksProps {
  title: string
  steps: Step[]
}

export default function HowItWorks({ title, steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="py-20 bg-seasalt">
      <div className="container mx-auto px-4">
        <h2 className="heading-md text-english-violet mb-12 text-center">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm relative">
              <div className="absolute -top-4 -left-4 w-10 h-10 rounded-full bg-english-violet text-white flex items-center justify-center font-bold text-lg">
                {index + 1}
              </div>
              <h3 className="heading-sm text-english-violet mb-3 mt-2">{step.title}</h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
