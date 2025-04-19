export interface EmployeeData {
  name: string
  position: string
  phone: string
  meetingLink: string
  email: string
  photo: string
  mobile?: string
  fax?: string
}

export interface CompanyData {
  name: string
  website: string
  slogan: string
  address: string
  logo: string
  icon: string
  socialMedia: {
    instagram?: string
    twitter?: string
    linkedin?: string
    facebook?: string
    youtube?: string
  }
}

export interface ShowElements {
  photo: boolean
  position: boolean
  phone: boolean
  mobile: boolean
  fax: boolean
  email: boolean
  meetingLink: boolean
  address: boolean
  website: boolean
  socialMedia: boolean
  logo: boolean
  icon: boolean
  slogan: boolean
  banner: boolean
  disclaimer: boolean
}

export interface TemplateProps {
  employee: EmployeeData
  company: CompanyData
  showElements: ShowElements
  primaryColor: string
  secondaryColor?: string
}
