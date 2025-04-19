import type { TemplateProps } from "./types"

export function Template3({ employee, company, showElements, primaryColor }: TemplateProps) {
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
                          borderRadius: "60px",
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

                    {showElements.logo && (
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        <img
                          src={company.logo || "/placeholder.svg"}
                          alt={company.name}
                          width="80"
                          style={{ display: "inline-block" }}
                        />
                      </div>
                    )}

                    {showElements.socialMedia && (
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        {company.socialMedia.facebook && (
                          <a
                            href={company.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: "5px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              backgroundColor: "#4267B2",
                              textAlign: "center",
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/facebook-white.svg"
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
                              marginRight: "5px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              backgroundColor: "#1DA1F2",
                              textAlign: "center",
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/twitter-white.svg"
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
                              marginRight: "5px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              backgroundColor: "#0077B5",
                              textAlign: "center",
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/linkedin-white.svg"
                              alt="LinkedIn"
                              width="16"
                              height="16"
                              style={{ verticalAlign: "middle" }}
                            />
                          </a>
                        )}

                        {company.socialMedia.instagram && (
                          <a
                            href={company.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              marginRight: "5px",
                              width: "30px",
                              height: "30px",
                              borderRadius: "50%",
                              backgroundColor: "#E1306C",
                              textAlign: "center",
                              lineHeight: "30px",
                            }}
                          >
                            <img
                              src="https://magecdn.com/icons/instagram-white.svg"
                              alt="Instagram"
                              width="16"
                              height="16"
                              style={{ verticalAlign: "middle" }}
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </td>

                  <td style={{ verticalAlign: "top" }}>
                    <p
                      style={{
                        fontSize: "24px",
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
                          margin: "0 0 5px 0",
                        }}
                      >
                        {employee.position}
                      </p>
                    )}

                    {showElements.position && company.name && (
                      <p
                        style={{
                          fontSize: "16px",
                          color: "#666666",
                          margin: "0 0 15px 0",
                        }}
                      >
                        {company.name}
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
                            <td style={{ paddingRight: "10px", paddingBottom: "10px", verticalAlign: "top" }}>
                              <img
                                src="https://magecdn.com/icons/phone.svg"
                                alt="Phone"
                                width="16"
                                height="16"
                                style={{ display: "block" }}
                              />
                            </td>
                            <td style={{ paddingBottom: "10px" }}>
                              <a
                                href={`tel:${employee.phone}`}
                                style={{ color: "#333333", textDecoration: "none", fontSize: "14px" }}
                              >
                                {employee.phone}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.email && (
                          <tr>
                            <td style={{ paddingRight: "10px", paddingBottom: "10px", verticalAlign: "top" }}>
                              <img
                                src="https://magecdn.com/icons/email.svg"
                                alt="Email"
                                width="16"
                                height="16"
                                style={{ display: "block" }}
                              />
                            </td>
                            <td style={{ paddingBottom: "10px" }}>
                              <a
                                href={`mailto:${employee.email}`}
                                style={{ color: "#333333", textDecoration: "none", fontSize: "14px" }}
                              >
                                {employee.email}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.website && (
                          <tr>
                            <td style={{ paddingRight: "10px", paddingBottom: "10px", verticalAlign: "top" }}>
                              <img
                                src="https://magecdn.com/icons/globe.svg"
                                alt="Website"
                                width="16"
                                height="16"
                                style={{ display: "block" }}
                              />
                            </td>
                            <td style={{ paddingBottom: "10px" }}>
                              <a
                                href={`https://${displayWebsite}`}
                                style={{ color: "#333333", textDecoration: "none", fontSize: "14px" }}
                              >
                                {displayWebsite}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.address && (
                          <tr>
                            <td style={{ paddingRight: "10px", paddingBottom: "10px", verticalAlign: "top" }}>
                              <img
                                src="https://magecdn.com/icons/location.svg"
                                alt="Address"
                                width="16"
                                height="16"
                                style={{ display: "block" }}
                              />
                            </td>
                            <td style={{ paddingBottom: "10px", fontSize: "14px", color: "#333333" }}>
                              {company.address}
                            </td>
                          </tr>
                        )}

                        {showElements.meetingLink && (
                          <tr>
                            <td style={{ paddingRight: "10px", paddingBottom: "10px", verticalAlign: "top" }}>
                              <img
                                src="https://magecdn.com/icons/calendar.svg"
                                alt="Meeting"
                                width="16"
                                height="16"
                                style={{ display: "block" }}
                              />
                            </td>
                            <td style={{ paddingBottom: "10px" }}>
                              <a
                                href={employee.meetingLink}
                                style={{ color: "#333333", textDecoration: "none", fontSize: "14px" }}
                              >
                                Schedule a meeting
                              </a>
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
