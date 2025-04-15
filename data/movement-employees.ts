export interface Employee {
  id: string
  name: string
  firstName: string
  lastName: string
  title: string
  email: string
  phone: string
  avatarUrl: string
  useCompanyLogo?: boolean // Flag to indicate if using company logo instead of personal headshot
  scheduleLink?: string
}

export const movementEmployees: Employee[] = [
  {
    id: "chris-buhl",
    name: "Chris Buhl",
    firstName: "CHRIS",
    lastName: "BUHL",
    title: "Head of Production // Co-Owner",
    email: "chris@movement.io",
    phone: "(616) 610-4464",
    avatarUrl: "/animations/sample-avatar.gif",
    useCompanyLogo: true, // Chris uses the company logo GIF
    scheduleLink: "https://calendly.com/movement-io/meeting",
  },
  {
    id: "sarah-johnson",
    name: "Sarah Johnson",
    firstName: "SARAH",
    lastName: "JOHNSON",
    title: "Marketing Director // Co-Owner",
    email: "sarah@movement.io",
    phone: "(616) 555-1234",
    avatarUrl: "/animations/sample-email-sig.gif",
    useCompanyLogo: false, // Sarah uses her personal headshot GIF
    scheduleLink: "https://calendly.com/movement-io/sarah",
  },
  {
    id: "alex-rodriguez",
    name: "Alex Rodriguez",
    firstName: "ALEX",
    lastName: "RODRIGUEZ",
    title: "Creative Director",
    email: "alex@movement.io",
    phone: "(616) 555-5678",
    avatarUrl: "/animations/sample-avatar.gif",
    useCompanyLogo: true,
  },
  {
    id: "taylor-smith",
    name: "Taylor Smith",
    firstName: "TAYLOR",
    lastName: "SMITH",
    title: "Senior Developer",
    email: "taylor@movement.io",
    phone: "(616) 555-9012",
    avatarUrl: "/animations/sample-email-sig.gif",
    useCompanyLogo: false,
  },
  {
    id: "jordan-patel",
    name: "Jordan Patel",
    firstName: "JORDAN",
    lastName: "PATEL",
    title: "UX Designer",
    email: "jordan@movement.io",
    phone: "(616) 555-3456",
    avatarUrl: "/animations/sample-avatar.gif",
    useCompanyLogo: true,
  },
]

// Company default assets
export const companyAssets = {
  logo: "/placeholder.svg?height=60&width=200&text=Movement.io",
  brandColor: "#29505F",
  brandedGif: "/animations/sample-avatar.gif", // Company branded GIF without headshot
}
