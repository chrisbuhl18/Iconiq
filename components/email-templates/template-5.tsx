import type { TemplateProps } from "./types"

export function Template5({ employee, company, showElements, primaryColor }: TemplateProps) {
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
                      <div
                        style={{
                          width: "120px",
                          height: "120px",
                          backgroundColor: primaryColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          overflow: "hidden",
                        }}
                      >
                        <img
                          src={employee.photo || "/placeholder.svg"}
                          alt={employee.name}
                          width="120"
                          height="120"
                          style={{ display: "block" }}
                        />
                      </div>
                    )}
                  </td>

                  <td style={{ verticalAlign: "top" }}>
                    <p
                      style={{
                        fontSize: "28px",
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
                          fontSize: "16px",
                          color: "#666666",
                          margin: "0 0 15px 0",
                        }}
                      >
                        {employee.position}
                      </p>
                    )}

                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        {showElements.phone && (
                          <tr>
                            <td
                              style={{
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              Mobile:{" "}
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
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              Website:{" "}
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
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              Email:{" "}
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
                                fontSize: "14px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                            >
                              Address: {company.address}
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
                              src="https://magecdn.com/icons/facebook.svg"
                              alt="Facebook"
                              width="24"
                              height="24"
                              style={{
                                filter:
                                  "invert(70%) sepia(54%) saturate(1352%) hue-rotate(359deg) brightness(103%) contrast(106%)",
                              }}
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
                              src="https://magecdn.com/icons/linkedin.svg"
                              alt="LinkedIn"
                              width="24"
                              height="24"
                              style={{
                                filter:
                                  "invert(70%) sepia(54%) saturate(1352%) hue-rotate(359deg) brightness(103%) contrast(106%)",
                              }}
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
                              src="https://magecdn.com/icons/twitter.svg"
                              alt="Twitter"
                              width="24"
                              height="24"
                              style={{
                                filter:
                                  "invert(70%) sepia(54%) saturate(1352%) hue-rotate(359deg) brightness(103%) contrast(106%)",
                              }}
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
                        backgroundColor: primaryColor,
                        padding: "15px",
                        borderRadius: "4px",
                      }}
                    >
                      <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                        <tbody>
                          <tr>
                            <td style={{ width: "150px", verticalAlign: "middle" }}>
                              <p
                                style={{
                                  color: "#333333",
                                  fontSize: "16px",
                                  margin: "0",
                                  fontWeight: "bold",
                                }}
                              >
                                New Book
                                <br />
                                coming
                                <br />
                                this summer
                              </p>
                            </td>
                            <td style={{ verticalAlign: "middle" }}>
                              <p
                                style={{
                                  color: "#333333",
                                  fontSize: "24px",
                                  margin: "0",
                                  fontStyle: "italic",
                                  fontWeight: "bold",
                                }}
                              >
                                {showElements.slogan && company.slogan}
                              </p>
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
