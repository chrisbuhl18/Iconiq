import type { TemplateProps } from "./types"

export function TemplateModern({ employee, company, showElements, primaryColor }: TemplateProps) {
  return (
    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333", width: "100%" }}>
      <tbody>
        <tr>
          <td>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  {/* Left column with photo and social icons */}
                  <td style={{ verticalAlign: "top", paddingRight: "24px" }}>
                    {showElements.photo && (
                      <div style={{ marginBottom: "12px" }}>
                        <img
                          src={employee.photo || "/placeholder.svg"}
                          alt={employee.name}
                          width="96"
                          height="96"
                          style={{ borderRadius: "50%", display: "block" }}
                        />
                      </div>
                    )}

                    {showElements.socialMedia && (
                      <div style={{ display: "flex", gap: "8px" }}>
                        {company.socialMedia.facebook && (
                          <a
                            href={company.socialMedia.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(95, 0, 186, 0.8)",
                              textDecoration: "none",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/facebook.svg"
                              alt="Facebook"
                              width="12"
                              height="12"
                              style={{ filter: "invert(1)" }}
                            />
                          </a>
                        )}

                        {company.socialMedia.linkedin && (
                          <a
                            href={company.socialMedia.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(95, 0, 186, 0.8)",
                              textDecoration: "none",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/linkedin.svg"
                              alt="LinkedIn"
                              width="12"
                              height="12"
                              style={{ filter: "invert(1)" }}
                            />
                          </a>
                        )}

                        {company.socialMedia.instagram && (
                          <a
                            href={company.socialMedia.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(95, 0, 186, 0.8)",
                              textDecoration: "none",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/instagram.svg"
                              alt="Instagram"
                              width="12"
                              height="12"
                              style={{ filter: "invert(1)" }}
                            />
                          </a>
                        )}

                        {company.socialMedia.twitter && (
                          <a
                            href={company.socialMedia.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: "20px",
                              height: "20px",
                              borderRadius: "50%",
                              backgroundColor: "rgba(95, 0, 186, 0.8)",
                              textDecoration: "none",
                            }}
                          >
                            <img
                              src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/twitter.svg"
                              alt="Twitter"
                              width="12"
                              height="12"
                              style={{ filter: "invert(1)" }}
                            />
                          </a>
                        )}
                      </div>
                    )}
                  </td>

                  {/* Right column with name, title, and contact info */}
                  <td style={{ verticalAlign: "top", paddingTop: "4px" }}>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: "bold",
                        margin: "0 0 4px 0",
                        color: "#5F00BA",
                        textTransform: "uppercase",
                      }}
                    >
                      {employee.name}
                    </p>

                    {showElements.position && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                          margin: "0 0 8px 0",
                        }}
                      >
                        {employee.position} // {company.name}
                      </p>
                    )}

                    <table cellPadding="0" cellSpacing="0">
                      <tbody>
                        {showElements.email && (
                          <tr>
                            <td style={{ verticalAlign: "top", paddingRight: "8px", paddingBottom: "4px" }}>
                              <img
                                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/mail-dot-ru.svg"
                                alt="Email"
                                width="16"
                                height="16"
                              />
                            </td>
                            <td style={{ paddingBottom: "4px" }}>
                              <a
                                href={`mailto:${employee.email}`}
                                style={{ color: "#666666", textDecoration: "none", fontSize: "14px" }}
                              >
                                {employee.email}
                              </a>
                            </td>
                          </tr>
                        )}

                        {showElements.phone && (
                          <tr>
                            <td style={{ verticalAlign: "top", paddingRight: "8px", paddingBottom: "4px" }}>
                              <img
                                src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/phone.svg"
                                alt="Phone"
                                width="16"
                                height="16"
                              />
                            </td>
                            <td style={{ paddingBottom: "4px" }}>
                              <a
                                href={`tel:${employee.phone}`}
                                style={{ color: "#666666", textDecoration: "none", fontSize: "14px" }}
                              >
                                {employee.phone}
                              </a>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>

                    {showElements.slogan && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                          margin: "4px 0 0 0",
                        }}
                      >
                        {company.slogan}
                      </p>
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
