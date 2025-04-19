import type { TemplateProps } from "./types"

export function Template7({ employee, company, showElements, primaryColor }: TemplateProps) {
  // Format website URL for display (remove http/https)
  const displayWebsite = company.website.replace(/^https?:\/\//, "")

  return (
    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "top" }}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td style={{ paddingRight: "15px", verticalAlign: "top" }}>
                    {showElements.icon && (
                      <img
                        src={company.icon || "/placeholder.svg"}
                        alt={company.name}
                        width="80"
                        height="80"
                        style={{ display: "block" }}
                      />
                    )}
                  </td>

                  <td style={{ verticalAlign: "top" }}>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "bold",
                        margin: "0 0 5px 0",
                        color: "#333333",
                      }}
                    >
                      {employee.name}
                    </p>

                    {showElements.position && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                          margin: "0 0 10px 0",
                        }}
                      >
                        {employee.position}, {company.name}
                      </p>
                    )}

                    <div
                      style={{
                        height: "1px",
                        backgroundColor: primaryColor,
                        width: "100%",
                        margin: "10px 0",
                      }}
                    ></div>

                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        {showElements.address && (
                          <tr>
                            <td
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "15px",
                              }}
                            >
                              A
                            </td>
                            <td
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              {company.address}
                            </td>
                          </tr>
                        )}

                        {showElements.phone && (
                          <tr>
                            <td
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "15px",
                              }}
                            >
                              P
                            </td>
                            <td
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              <a href={`tel:${employee.phone}`} style={{ color: "#333333", textDecoration: "none" }}>
                                {employee.phone}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.mobile && employee.mobile && (
                          <tr>
                            <td
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "15px",
                              }}
                            >
                              M
                            </td>
                            <td
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              <a href={`tel:${employee.mobile}`} style={{ color: "#333333", textDecoration: "none" }}>
                                {employee.mobile}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.website && (
                          <tr>
                            <td
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "15px",
                              }}
                            >
                              W
                            </td>
                            <td
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              <a
                                href={`https://${displayWebsite}`}
                                style={{ color: "#333333", textDecoration: "none" }}
                              >
                                {displayWebsite}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.email && (
                          <tr>
                            <td
                              style={{
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "15px",
                              }}
                            >
                              E
                            </td>
                            <td
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              <a href={`mailto:${employee.email}`} style={{ color: "#333333", textDecoration: "none" }}>
                                {employee.email}
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {showElements.socialMedia && (
                      <div style={{ marginTop: "10px" }}>
                        {company.socialMedia.facebook && (
                          <a
                            href={company.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: "8px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/facebook-circle.svg"
                              alt="Facebook"
                              width="24"
                              height="24"
                            />
                          </a>
                        )}

                        {company.socialMedia.twitter && (
                          <a
                            href={company.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: "8px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/twitter-circle.svg"
                              alt="Twitter"
                              width="24"
                              height="24"
                            />
                          </a>
                        )}

                        {company.socialMedia.linkedin && (
                          <a
                            href={company.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: "8px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/linkedin-circle.svg"
                              alt="LinkedIn"
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
      </tbody>
    </table>
  )
}
