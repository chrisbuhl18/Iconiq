import type { Employee, CompanyInfo } from "./signature-delivery-page"

interface EmailSignatureProps {
  employee: Employee
  company: CompanyInfo
  template: string
  customizations: {
    showAvatar: boolean
    showSocialIcons: boolean
    showCompanyLogo: boolean
    showMobile: boolean
    showLocation: boolean
    customTagline: string
  }
}

export function EmailSignature({ employee, company, template, customizations }: EmailSignatureProps) {
  // Generate avatar placeholder if not provided
  const avatarUrl =
    employee.avatar || `/placeholder.svg?height=100&width=100&query=avatar%20of%20${encodeURIComponent(employee.name)}`

  // Generate social media icons
  const socialIcons = {
    linkedin: "https://magecdn.com/icons/linkedin.svg",
    twitter: "https://magecdn.com/icons/twitter.svg",
  }

  // Different templates
  if (template === "minimal") {
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: "15px", verticalAlign: "top" }}>
              {customizations.showAvatar && (
                <img
                  src={avatarUrl || "/placeholder.svg"}
                  alt={employee.name}
                  width="70"
                  height="70"
                  style={{ borderRadius: "50%", display: "block" }}
                />
              )}
            </td>
            <td style={{ borderLeft: `2px solid ${company.primaryColor}`, paddingLeft: "15px" }}>
              <p style={{ margin: "0 0 5px 0", fontWeight: "bold", fontSize: "16px", color: company.primaryColor }}>
                {employee.name}
              </p>
              <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666666" }}>{employee.title}</p>
              <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                <a href={`mailto:${employee.email}`} style={{ color: "#666666", textDecoration: "none" }}>
                  {employee.email}
                </a>
              </p>
              {employee.phone && (
                <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                  <a href={`tel:${employee.phone}`} style={{ color: "#666666", textDecoration: "none" }}>
                    {employee.phone}
                  </a>
                </p>
              )}
              {customizations.showMobile && employee.mobile && (
                <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                  <a href={`tel:${employee.mobile}`} style={{ color: "#666666", textDecoration: "none" }}>
                    {employee.mobile} (Mobile)
                  </a>
                </p>
              )}
              {customizations.showLocation && employee.location && (
                <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666666" }}>{employee.location}</p>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    )
  }

  if (template === "animated") {
    // In a real implementation, this would include animated GIF or CSS animation
    return (
      <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
        <tbody>
          <tr>
            <td style={{ paddingRight: "20px", verticalAlign: "top" }}>
              {customizations.showAvatar && (
                <div style={{ position: "relative", width: "100px", height: "100px" }}>
                  <img
                    src={avatarUrl || "/placeholder.svg"}
                    alt={employee.name}
                    width="100"
                    height="100"
                    style={{
                      borderRadius: "50%",
                      display: "block",
                      border: `3px solid ${company.primaryColor}`,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      bottom: "5px",
                      right: "5px",
                      width: "20px",
                      height: "20px",
                      borderRadius: "50%",
                      backgroundColor: "#4CAF50",
                      border: "2px solid white",
                    }}
                  />
                </div>
              )}
            </td>
            <td style={{ paddingLeft: "0" }}>
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td>
                      <p
                        style={{
                          margin: "0 0 5px 0",
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: company.primaryColor,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {employee.name}
                      </p>
                      <p
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "14px",
                          color: company.secondaryColor,
                          fontWeight: "500",
                        }}
                      >
                        {employee.title} | {employee.department}
                      </p>

                      <table cellPadding="0" cellSpacing="0">
                        <tbody>
                          <tr>
                            <td style={{ verticalAlign: "top", paddingRight: "5px", width: "20px" }}>
                              <img src="https://magecdn.com/icons/email.svg" alt="Email" width="16" height="16" />
                            </td>
                            <td style={{ paddingBottom: "5px" }}>
                              <a
                                href={`mailto:${employee.email}`}
                                style={{
                                  color: "#666666",
                                  textDecoration: "none",
                                  fontSize: "14px",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                {employee.email}
                              </a>
                            </td>
                          </tr>

                          {employee.phone && (
                            <tr>
                              <td style={{ verticalAlign: "top", paddingRight: "5px", width: "20px" }}>
                                <img src="https://magecdn.com/icons/phone.svg" alt="Phone" width="16" height="16" />
                              </td>
                              <td style={{ paddingBottom: "5px" }}>
                                <a
                                  href={`tel:${employee.phone}`}
                                  style={{
                                    color: "#666666",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontFamily: "Arial, sans-serif",
                                  }}
                                >
                                  {employee.phone}
                                </a>
                              </td>
                            </tr>
                          )}

                          {customizations.showMobile && employee.mobile && (
                            <tr>
                              <td style={{ verticalAlign: "top", paddingRight: "5px", width: "20px" }}>
                                <img src="https://magecdn.com/icons/mobile.svg" alt="Mobile" width="16" height="16" />
                              </td>
                              <td style={{ paddingBottom: "5px" }}>
                                <a
                                  href={`tel:${employee.mobile}`}
                                  style={{
                                    color: "#666666",
                                    textDecoration: "none",
                                    fontSize: "14px",
                                    fontFamily: "Arial, sans-serif",
                                  }}
                                >
                                  {employee.mobile}
                                </a>
                              </td>
                            </tr>
                          )}

                          {customizations.showLocation && employee.location && (
                            <tr>
                              <td style={{ verticalAlign: "top", paddingRight: "5px", width: "20px" }}>
                                <img
                                  src="https://magecdn.com/icons/location.svg"
                                  alt="Location"
                                  width="16"
                                  height="16"
                                />
                              </td>
                              <td
                                style={{
                                  paddingBottom: "5px",
                                  fontSize: "14px",
                                  color: "#666666",
                                  fontFamily: "Arial, sans-serif",
                                }}
                              >
                                {employee.location}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>

                      {customizations.showSocialIcons && (
                        <div style={{ marginTop: "10px" }}>
                          {employee.linkedin && (
                            <a
                              href={employee.linkedin}
                              style={{ display: "inline-block", marginRight: "8px" }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={socialIcons.linkedin || "/placeholder.svg"}
                                alt="LinkedIn"
                                width="24"
                                height="24"
                              />
                            </a>
                          )}
                          {employee.twitter && (
                            <a
                              href={employee.twitter}
                              style={{ display: "inline-block", marginRight: "8px" }}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <img
                                src={socialIcons.twitter || "/placeholder.svg"}
                                alt="Twitter"
                                width="24"
                                height="24"
                              />
                            </a>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {customizations.showCompanyLogo && (
            <tr>
              <td
                colSpan={2}
                style={{ paddingTop: "15px", borderTop: `1px solid ${company.secondaryColor}`, marginTop: "15px" }}
              >
                <table cellPadding="0" cellSpacing="0" width="100%">
                  <tbody>
                    <tr>
                      <td>
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          height="40"
                          style={{ display: "block" }}
                        />
                      </td>
                      {customizations.customTagline && (
                        <td style={{ textAlign: "right", fontSize: "13px", color: "#888888", fontStyle: "italic" }}>
                          {customizations.customTagline}
                        </td>
                      )}
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }

  // Default standard template
  return (
    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
      <tbody>
        <tr>
          <td style={{ paddingRight: "15px", verticalAlign: "top" }}>
            {customizations.showAvatar && (
              <img
                src={avatarUrl || "/placeholder.svg"}
                alt={employee.name}
                width="80"
                height="80"
                style={{ borderRadius: "50%", display: "block" }}
              />
            )}
          </td>
          <td style={{ borderLeft: `2px solid ${company.primaryColor}`, paddingLeft: "15px" }}>
            <p style={{ margin: "0 0 5px 0", fontWeight: "bold", fontSize: "16px", color: company.primaryColor }}>
              {employee.name}
            </p>
            <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666666" }}>
              {employee.title} | {employee.department}
            </p>
            <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
              <a href={`mailto:${employee.email}`} style={{ color: "#666666", textDecoration: "none" }}>
                {employee.email}
              </a>
            </p>
            {employee.phone && (
              <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                <a href={`tel:${employee.phone}`} style={{ color: "#666666", textDecoration: "none" }}>
                  {employee.phone}
                </a>
              </p>
            )}
            {customizations.showMobile && employee.mobile && (
              <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                <a href={`tel:${employee.mobile}`} style={{ color: "#666666", textDecoration: "none" }}>
                  {employee.mobile} (Mobile)
                </a>
              </p>
            )}
            {customizations.showLocation && employee.location && (
              <p style={{ margin: "0 0 5px 0", fontSize: "14px", color: "#666666" }}>{employee.location}</p>
            )}

            {customizations.showSocialIcons && (
              <div style={{ marginTop: "10px" }}>
                {employee.linkedin && (
                  <a
                    href={employee.linkedin}
                    style={{ display: "inline-block", marginRight: "8px" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={socialIcons.linkedin || "/placeholder.svg"} alt="LinkedIn" width="20" height="20" />
                  </a>
                )}
                {employee.twitter && (
                  <a
                    href={employee.twitter}
                    style={{ display: "inline-block", marginRight: "8px" }}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={socialIcons.twitter || "/placeholder.svg"} alt="Twitter" width="20" height="20" />
                  </a>
                )}
              </div>
            )}
          </td>
        </tr>

        {customizations.showCompanyLogo && (
          <tr>
            <td colSpan={2} style={{ paddingTop: "15px" }}>
              <img
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                height="30"
                style={{ display: "block" }}
              />
              {customizations.customTagline && (
                <p style={{ margin: "5px 0 0 0", fontSize: "12px", color: "#888888", fontStyle: "italic" }}>
                  {customizations.customTagline}
                </p>
              )}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  )
}
