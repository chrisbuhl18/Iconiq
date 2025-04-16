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
    <section id="how-it-works" className="py-12 md:py-20 bg-seasalt">
      <div className="container mx-auto px-4 sm:px-6">
        <h2 className="heading-md text-english-violet mb-8 md:mb-12 text-center">{title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-lg p-5 md:p-6 shadow-sm relative">
              <div className="absolute -top-3 md:-top-4 -left-3 md:-left-4 w-8 h-8 md:w-10 md:h-10 rounded-full bg-english-violet text-white flex items-center justify-center font-bold text-base md:text-lg">
                {index + 1}
              </div>
              <h3 className="heading-sm text-english-violet mb-2 md:mb-3 mt-1 md:mt-2">
                {step.title.includes("Your") ? (
                  <>
                    {step.title.split("Your")[0]}Your
                    <br />
                    {step.title.split("Your")[1]}
                  </>
                ) : step.title.includes(" & ") ? (
                  <>
                    {step.title.split(" & ")[0]} &<br />
                    {step.title.split(" & ")[1]}
                  </>
                ) : step.title.includes("Package") ? (
                  <>
                    {step.title.split("Package")[0]}
                    <br />
                    Package{step.title.split("Package")[1]}
                  </>
                ) : step.title.includes("Animation") ? (
                  <>
                    {step.title.split("Animation")[0]}
                    <br />
                    Animation{step.title.split("Animation")[1]}
                  </>
                ) : (
                  // For any other titles, try to split at a space near the middle
                  <>
                    {step.title
                      .split(" ")
                      .slice(0, Math.ceil(step.title.split(" ").length / 2))
                      .join(" ")}
                    <br />
                    {step.title
                      .split(" ")
                      .slice(Math.ceil(step.title.split(" ").length / 2))
                      .join(" ")}
                  </>
                )}
              </h3>
              <p className="text-sm md:text-base text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
