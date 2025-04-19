import type { TemplateProps } from "./types"

export function Template2({
  employee,
  company,
  showElements,
  primaryColor,
  secondaryColor = "#666666",
}: TemplateProps) {
  // Format website URL for display (remove http/https)
  const displayWebsite = company.website.replace(/^https?:\/\//, "")

  return (
    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "top", paddingRight: "15px" }}>
            {showElements.photo && (
              <img
                src={employee.photo || "/placeholder.svg"}
                alt={employee.name}
                width="140"
                height="140"
                style={{ borderRadius: "50%", display: "block" }}
              />
            )}

            {showElements.socialMedia && (
              <div style={{ marginTop: "8px", textAlign: "center" }}>
                {company.socialMedia.facebook && (
                  <a
                    href={company.socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-block",
                      marginRight: "8px",
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                      textAlign: "center",
                      lineHeight: "0",
                      fontSize: "0",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/facebook.svg"
                      alt="Facebook"
                      width="16"
                      height="16"
                      style={{
                        display: "inline-block",
                        margin: "7px",
                        verticalAlign: "middle",
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
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                      textAlign: "center",
                      lineHeight: "0",
                      fontSize: "0",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/twitter.svg"
                      alt="Twitter"
                      width="16"
                      height="16"
                      style={{
                        display: "inline-block",
                        margin: "7px",
                        verticalAlign: "middle",
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
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                      textAlign: "center",
                      lineHeight: "0",
                      fontSize: "0",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/linkedin.svg"
                      alt="LinkedIn"
                      width="16"
                      height="16"
                      style={{
                        display: "inline-block",
                        margin: "7px",
                        verticalAlign: "middle",
                      }}
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
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      border: "1px solid #333",
                      textAlign: "center",
                      lineHeight: "0",
                      fontSize: "0",
                      verticalAlign: "middle",
                    }}
                  >
                    <img
                      src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/youtube.svg"
                      alt="YouTube"
                      width="16"
                      height="16"
                      style={{
                        display: "inline-block",
                        margin: "7px",
                        verticalAlign: "middle",
                      }}
                    />
                  </a>
                )}
              </div>
            )}
          </td>
          <td style={{ verticalAlign: "top" }}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td style={{ verticalAlign: "top" }}>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                margin: "0 0 0px 0",
                                color: primaryColor,
                              }}
                            >
                              {employee.name}
                            </p>

                            {showElements.position && (
                              <p
                                style={{
                                  fontSize: "16px",
                                  color: secondaryColor,
                                  margin: "0 0 10px 0",
                                }}
                              >
                                {showElements.position && employee.position}, {company.name}
                              </p>
                            )}
                          </td>
                          {showElements.icon && (
                            <td style={{ verticalAlign: "top", textAlign: "right", width: "60px" }}>
                              <img
                                src={company.icon || "/placeholder.svg"}
                                alt={company.name}
                                width="50"
                                height="50"
                                style={{ display: "inline-block" }}
                              />
                            </td>
                          )}
                        </tr>
                      </tbody>
                    </table>

                    <div
                      style={{
                        height: "2px",
                        backgroundColor: primaryColor,
                        width: "100%",
                        margin: "5px 0 15px 0",
                      }}
                    ></div>

                    <table cellPadding="1px" cellSpacing="0" style={{ width: "100%" }}>
                      <tbody>
                        {/* Phone and Email on the same line */}
                        {(showElements.phone || showElements.email) && (
                          <tr>
                            {showElements.phone && (
                              <>
                                <td
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: primaryColor,
                                    paddingRight: "10px",
                                    paddingBottom: "5px",
                                    width: "15px",
                                  }}
                                >
                                  P
                                </td>
                                <td
                                  style={{
                                    fontSize: "16px",
                                    color: "#333333",
                                    paddingBottom: "5px",
                                    paddingRight: "20px",
                                  }}
                                >
                                  <a
                                    href={`tel:${employee.phone}`}
                                    style={{ color: "#333333", textDecoration: "none" }}
                                  >
                                    {employee.phone}
                                  </a>
                                </td>
                              </>
                            )}

                            {showElements.email && (
                              <>
                                <td
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: primaryColor,
                                    paddingRight: "10px",
                                    paddingBottom: "5px",
                                    width: "15px",
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
                                  <a
                                    href={`mailto:${employee.email}`}
                                    style={{ color: "#333333", textDecoration: "none" }}
                                  >
                                    {employee.email}
                                  </a>
                                </td>
                              </>
                            )}
                          </tr>
                        )}

                        {/* Mobile and Fax */}
                        {showElements.mobile && employee.mobile && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                width: "15px",
                              }}
                            >
                              M
                            </td>
                            <td
                              style={{
                                fontSize: "16px",
                                color: "#333333",
                                paddingBottom: "5px",
                              }}
                              colSpan={showElements.fax && employee.fax ? 1 : 3}
                            >
                              <a href={`tel:${employee.mobile}`} style={{ color: "#333333", textDecoration: "none" }}>
                                {employee.mobile}
                              </a>
                            </td>

                            {showElements.fax && employee.fax && (
                              <>
                                <td
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                    color: primaryColor,
                                    paddingRight: "10px",
                                    paddingLeft: "20px",
                                    paddingBottom: "5px",
                                    width: "15px",
                                  }}
                                >
                                  F
                                </td>
                                <td
                                  style={{
                                    fontSize: "16px",
                                    color: "#333333",
                                    paddingBottom: "5px",
                                  }}
                                >
                                  {employee.fax}
                                </td>
                              </>
                            )}
                          </tr>
                        )}

                        {/* Website */}
                        {showElements.website && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                width: "15px",
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
                              colSpan={3}
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

                        {/* Address */}
                        {showElements.address && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
                                width: "15px",
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
                              colSpan={3}
                            >
                              {company.address}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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
