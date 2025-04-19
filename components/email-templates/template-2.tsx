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
                width="100"
                height="100"
                style={{ borderRadius: "50%", display: "block" }}
              />
            )}
          </td>
          <td style={{ verticalAlign: "top" }}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <p
                      style={{
                        fontSize: "24px",
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
                          color: secondaryColor,
                          margin: "0 0 10px 0",
                        }}
                      >
                        {showElements.position && employee.position}, {company.name}
                      </p>
                    )}

                    <div
                      style={{
                        height: "2px",
                        backgroundColor: primaryColor,
                        width: "100%",
                        margin: "15px 0",
                      }}
                    ></div>

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

                        {showElements.mobile && employee.mobile && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
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
                            >
                              <a href={`tel:${employee.mobile}`} style={{ color: "#333333", textDecoration: "none" }}>
                                {employee.mobile}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.fax && employee.fax && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
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

                        {showElements.website && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
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

                        {showElements.address && (
                          <tr>
                            <td
                              style={{
                                fontSize: "16px",
                                fontWeight: "bold",
                                color: primaryColor,
                                paddingRight: "10px",
                                paddingBottom: "5px",
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
                      <div style={{ marginTop: "15px" }}>
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
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/facebook.svg"
                              alt="Facebook"
                              width="16"
                              height="16"
                              style={{ verticalAlign: "middle" }}
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
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/twitter.svg"
                              alt="Twitter"
                              width="16"
                              height="16"
                              style={{ verticalAlign: "middle" }}
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
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/linkedin.svg"
                              alt="LinkedIn"
                              width="16"
                              height="16"
                              style={{ verticalAlign: "middle" }}
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
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://cdn.lumio.email/social/youtube.png"
                              alt="YouTube"
                              width="16"
                              height="16"
                              style={{ verticalAlign: "middle" }}
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

          {showElements.logo && (
            <td style={{ verticalAlign: "top", paddingLeft: "30px" }}>
              <img
                src={company.logo || "/placeholder.svg"}
                alt={company.name}
                width="80"
                style={{ display: "block" }}
              />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  )
}
