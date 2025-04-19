import type { TemplateProps } from "./types"

export function Template1({ employee, company, showElements, primaryColor }: TemplateProps) {
  // Format website URL for display (remove http/https)
  const displayWebsite = company.website.replace(/^https?:\/\//, "")

  return (
    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "middle", paddingRight: "15px" }}>
            {showElements.photo && (
              <img
                src={employee.photo || "/placeholder.svg"}
                alt={employee.name}
                width="150"
                height="150"
                style={{ borderRadius: "50%", display: "block" }}
              />
            )}
          </td>
          <td style={{ verticalAlign: "middle" }}>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <p style={{ fontSize: "20px", fontWeight: "bold", margin: "0 0 0px 0" }}>{employee.name}</p>

                    {showElements.position && (
                      <p style={{ fontSize: "16px", color: "#666666", margin: "0 0 10px 0" }}>{employee.position}</p>
                    )}

                    {showElements.phone && (
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                        T:{" "}
                        <a href={`tel:${employee.phone}`} style={{ color: "#666666", textDecoration: "none" }}>
                          {employee.phone}
                        </a>
                      </p>
                    )}

                    {showElements.email && (
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                        E:{" "}
                        <a href={`mailto:${employee.email}`} style={{ color: "#666666", textDecoration: "none" }}>
                          {employee.email}
                        </a>
                      </p>
                    )}

                    {showElements.website && (
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                        W:{" "}
                        <a href={`https://${displayWebsite}`} style={{ color: "#666666", textDecoration: "none" }}>
                          {displayWebsite}
                        </a>
                      </p>
                    )}

                    {showElements.meetingLink && (
                      <p style={{ margin: "0 0 5px 0", fontSize: "14px" }}>
                        <a href={employee.meetingLink} style={{ color: "#666666", textDecoration: "none" }}>
                          Schedule a meeting
                        </a>
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>

          {showElements.socialMedia && (
            <td style={{ verticalAlign: "middle", paddingLeft: "20px" }}>
              <table cellPadding="0" cellSpacing="0">
                <tbody>
                  <tr>
                    <td style={{ paddingBottom: "10px" }}>
                      {company.socialMedia.facebook && (
                        <a href={company.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor: primaryColor,
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/facebook.svg"
                              alt="Facebook"
                              width="16"
                              height="16"
                              style={{ filter: "invert(1)" }}
                            />
                          </div>
                        </a>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td style={{ paddingBottom: "10px" }}>
                      {company.socialMedia.twitter && (
                        <a href={company.socialMedia.twitter} target="_blank" rel="noopener noreferrer">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor: primaryColor,
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/twitter.svg"
                              alt="Twitter"
                              width="16"
                              height="16"
                              style={{ filter: "invert(1)" }}
                            />
                          </div>
                        </a>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      {company.socialMedia.linkedin && (
                        <a href={company.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "50%",
                              backgroundColor: primaryColor,
                              textAlign: "center",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/linkedin.svg"
                              alt="LinkedIn"
                              width="16"
                              height="16"
                              style={{ filter: "invert(1)" }}
                            />
                          </div>
                        </a>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          )}
        </tr>
      </tbody>
    </table>
  )
}
