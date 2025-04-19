import type { TemplateProps } from "./types"

export function Template6({ employee, company, showElements, primaryColor }: TemplateProps) {
  // Format website URL for display (remove http/https)
  const displayWebsite = company.website.replace(/^https?:\/\//, "")

  return (
    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: "Arial, sans-serif", color: "#333333", width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ verticalAlign: "top" }}>
            <table cellPadding="0" cellSpacing="0" style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td
                    style={{
                      width: "150px",
                      verticalAlign: "middle",
                      paddingRight: "20px",
                      borderRight: `1px solid #DDDDDD`,
                    }}
                  >
                    {showElements.logo && (
                      <img
                        src={company.logo || "/placeholder.svg"}
                        alt={company.name}
                        width="120"
                        style={{ display: "block" }}
                      />
                    )}

                    <p
                      style={{
                        fontSize: "24px",
                        color: "#666666",
                        margin: "10px 0 0 0",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {company.name}
                    </p>
                  </td>

                  <td style={{ verticalAlign: "top", paddingLeft: "20px" }}>
                    <p
                      style={{
                        fontSize: "20px",
                        fontWeight: "normal",
                        margin: "0 0 5px 0",
                        color: "#666666",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {employee.name}
                    </p>

                    {showElements.address && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                          margin: "0 0 5px 0",
                        }}
                      >
                        {company.address}
                      </p>
                    )}

                    {showElements.phone && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                          margin: "15px 0 0 0",
                        }}
                      >
                        {employee.phone} phone
                      </p>
                    )}

                    {showElements.fax && employee.fax && (
                      <p
                        style={{
                          fontSize: "14px",
                          color: "#666666",
                          margin: "5px 0 0 0",
                        }}
                      >
                        {employee.fax} fax
                      </p>
                    )}

                    {showElements.website && (
                      <p
                        style={{
                          fontSize: "14px",
                          margin: "15px 0 0 0",
                        }}
                      >
                        <a href={`https://${displayWebsite}`} style={{ color: primaryColor, textDecoration: "none" }}>
                          {displayWebsite}
                        </a>
                      </p>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {showElements.disclaimer && (
              <table cellPadding="0" cellSpacing="0" style={{ marginTop: "20px", width: "100%" }}>
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "15px 0",
                        borderTop: "1px solid #DDDDDD",
                      }}
                    >
                      <p
                        style={{
                          color: "#999999",
                          fontSize: "10px",
                          margin: "0",
                          lineHeight: "1.4",
                        }}
                      >
                        Request for information via email implies authorization to respond via email as well.
                        {employee.name} or representatives cannot be held responsible for lack of secure data
                        transmission if it occurs.
                      </p>
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
