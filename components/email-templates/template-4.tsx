import type { TemplateProps } from "./types"

export function Template4({ employee, company, showElements, primaryColor }: TemplateProps) {
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
                  <td style={{ paddingRight: "20px" }}>
                    {showElements.photo && (
                      <img
                        src={employee.photo || "/placeholder.svg"}
                        alt={employee.name}
                        width="120"
                        height="120"
                        style={{ borderRadius: "60px", display: "block" }}
                      />
                    )}
                  </td>

                  <td style={{ verticalAlign: "top" }}>
                    <p
                      style={{
                        fontSize: "28px",
                        fontWeight: "bold",
                        margin: "0 0 5px 0",
                        color: primaryColor,
                      }}
                    >
                      {employee.name}
                    </p>

                    {showElements.position && (
                      <p
                        style={{
                          fontSize: "16px",
                          color: "#333333",
                          margin: "0 0 15px 0",
                        }}
                      >
                        {employee.position}, {company.name}
                      </p>
                    )}

                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        {showElements.phone && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "20px",
                              }}
                            >
                              P
                            </td>
                            <td
                              style={{
                                fontSize: "16px",
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

                        {showElements.website && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "20px",
                              }}
                            >
                              W
                            </td>
                            <td
                              style={{
                                fontSize: "16px",
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
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "20px",
                              }}
                            >
                              E
                            </td>
                            <td
                              style={{
                                fontSize: "16px",
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

                        {showElements.address && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                verticalAlign: "top",
                                width: "20px",
                              }}
                            >
                              A
                            </td>
                            <td
                              style={{
                                fontSize: "16px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              {company.address}
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
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/facebook.svg"
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
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/twitter.svg"
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
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/linkedin.svg"
                              alt="LinkedIn"
                              width="24"
                              height="24"
                            />
                          </a>
                        )}

                        {company.socialMedia.youtube && (
                          <a
                            href={company.socialMedia.youtube}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: "8px",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/youtube.svg"
                              alt="YouTube"
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

            {showElements.banner && (
              <table cellPadding="0" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: "#2D3748",
                        padding: "15px",
                        borderRadius: "4px",
                      }}
                    >
                      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ width: "60px", verticalAlign: "middle" }}>
                              {showElements.icon && (
                                <img
                                  src={company.icon || "/placeholder.svg"}
                                  alt={company.name}
                                  width="50"
                                  height="50"
                                  style={{ display: "block" }}
                                />
                              )}
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <p
                                style={{
                                  color: "#FFFFFF",
                                  fontSize: "16px",
                                  margin: "0 0 5px 0",
                                  fontWeight: "bold",
                                }}
                              >
                                {showElements.slogan && company.slogan}
                              </p>
                              <p
                                style={{
                                  color: "#E2E8F0",
                                  fontSize: "14px",
                                  margin: "0",
                                }}
                              >
                                Discover more at{" "}
                                <a href={`https://${displayWebsite}`} style={{ color: "#FFFFFF" }}>
                                  {displayWebsite}
                                </a>
                              </p>
                            </td>
                            <td style={{ width: "120px", textAlign: "right", verticalAlign: "middle" }}>
                              <a
                                href={`https://${displayWebsite}`}
                                style={{
                                  display: "inline-block",
                                  padding: "8px 12px",
                                  backgroundColor: primaryColor,
                                  color: "#FFFFFF",
                                  textDecoration: "none",
                                  borderRadius: "4px",
                                  fontSize: "14px",
                                }}
                              >
                                Learn More
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
