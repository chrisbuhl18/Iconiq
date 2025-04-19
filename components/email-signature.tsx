import type { Employee } from "@/data/movement-employees"

interface EmailSignatureProps {
  employee: Employee
  companyColor: string
}

export default function EmailSignature({ employee, companyColor }: EmailSignatureProps) {
  return (
    <table
      cellPadding="0"
      cellSpacing="0"
      style={{ verticalAlign: "-webkit-baseline-middle", fontSize: "medium", fontFamily: "Arial" }}
    >
      <tbody>
        <tr>
          <td>
            <table
              cellPadding="0"
              cellSpacing="0"
              style={{ verticalAlign: "-webkit-baseline-middle", fontFamily: "Arial" }}
            >
              <tbody>
                <tr>
                  <td style={{ verticalAlign: "top" }}>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{
                        color: "rgb(255,255,255)",
                        verticalAlign: "-webkit-baseline-middle",
                        fontFamily: "Arial",
                      }}
                    >
                      <tbody>
                        <tr>
                          <td>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              style={{ verticalAlign: "-webkit-baseline-middle", fontFamily: "Arial" }}
                            >
                              <tbody>
                                <tr>
                                  <td style={{ verticalAlign: "top" }}>
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      style={{ verticalAlign: "-webkit-baseline-middle", fontFamily: "Arial" }}
                                    >
                                      <tbody>
                                        <tr>
                                          <td style={{ textAlign: "center" }}>
                                            <a href="https://movement.io" target="_blank" rel="noreferrer">
                                              <img
                                                src={employee.avatarUrl || "/placeholder.svg"}
                                                alt={employee.name}
                                                width="110"
                                                height="110"
                                                style={{ borderRadius: "50%" }}
                                              />
                                            </a>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                      <tbody style={{ color: "rgb(255,255,255)" }}>
                        <tr>
                          <td height="12"></td>
                        </tr>
                      </tbody>
                      <tbody>
                        <tr style={{ color: "rgb(255,255,255)" }}>
                          <td style={{ textAlign: "center" }}>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              style={{
                                verticalAlign: "-webkit-baseline-middle",
                                fontFamily: "Arial",
                                display: "inline-block",
                              }}
                            >
                              <tbody>
                                <tr>
                                  <td>
                                    <a href="https://www.facebook.com/MovementIO" target="_blank" rel="noreferrer">
                                      <img
                                        src="/placeholder.svg?height=20&width=20&text=f"
                                        width="20"
                                        height="20"
                                        alt="Facebook"
                                      />
                                    </a>
                                  </td>
                                  <td width="5">
                                    <div></div>
                                  </td>
                                  <td>
                                    <a
                                      href="https://www.linkedin.com/company/movement-io"
                                      target="_blank"
                                      rel="noreferrer"
                                    >
                                      <img
                                        src="/placeholder.svg?height=20&width=20&text=in"
                                        width="20"
                                        height="20"
                                        alt="LinkedIn"
                                      />
                                    </a>
                                  </td>
                                  <td width="5">
                                    <div></div>
                                  </td>
                                  <td>
                                    <a href="https://twitter.com/MovementIO" target="_blank" rel="noreferrer">
                                      <img
                                        src="/placeholder.svg?height=20&width=20&text=X"
                                        width="20"
                                        height="20"
                                        alt="Twitter"
                                      />
                                    </a>
                                  </td>
                                  <td width="5">
                                    <div></div>
                                  </td>
                                  <td>
                                    <a href="https://www.instagram.com/movement.io" target="_blank" rel="noreferrer">
                                      <img
                                        src="/placeholder.svg?height=20&width=20&text=IG"
                                        width="20"
                                        height="20"
                                        alt="Instagram"
                                      />
                                    </a>
                                  </td>
                                  <td width="5">
                                    <div></div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                  <td width="35">
                    <div></div>
                  </td>
                  <td style={{ padding: "0px", verticalAlign: "middle" }}>
                    <h3 color="#333333" style={{ margin: "0px", fontSize: "20px", color: companyColor }}>
                      {employee.firstName}&nbsp;{employee.lastName}
                    </h3>
                    <p
                      color="#333333"
                      style={{ margin: "0px", color: "rgb(51,51,51)", fontSize: "14px", lineHeight: "22px" }}
                    >
                      {employee.title}
                    </p>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ verticalAlign: "-webkit-baseline-middle", fontFamily: "Arial", width: "193.75px" }}
                    >
                      <tbody>
                        <tr>
                          <td height="12"></td>
                        </tr>
                        <tr>
                          <td
                            color={companyColor}
                            height="1"
                            style={{
                              width: "40px",
                              borderBottom: `2px solid ${companyColor}`,
                              borderLeft: "none",
                              display: "block",
                            }}
                          ></td>
                        </tr>
                        <tr>
                          <td height="12"></td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ verticalAlign: "-webkit-baseline-middle", fontFamily: "Arial" }}
                    >
                      <tbody>
                        <tr height="5" style={{ verticalAlign: "middle" }}>
                          <td style={{ color: "rgb(51,51,51)" }}>
                            <table
                              cellPadding="0"
                              cellSpacing="0"
                              style={{
                                color: "rgb(255,255,255)",
                                fontFamily: "Arial",
                                verticalAlign: "-webkit-baseline-middle",
                              }}
                            >
                              <tbody>
                                <tr height="10" style={{ verticalAlign: "middle" }}>
                                  <td style={{ padding: "0px", color: "rgb(51,51,51)" }}>
                                    <table
                                      cellPadding="0"
                                      cellSpacing="0"
                                      style={{
                                        color: "rgb(255,255,255)",
                                        fontFamily: "Arial",
                                        verticalAlign: "-webkit-baseline-middle",
                                      }}
                                    >
                                      <tbody>
                                        <tr height="10" style={{ verticalAlign: "middle" }}>
                                          <td style={{ padding: "0px", color: "rgb(51,51,51)" }}>
                                            <table
                                              cellPadding="0"
                                              cellSpacing="0"
                                              style={{
                                                color: "rgb(255,255,255)",
                                                fontFamily: "Arial",
                                                verticalAlign: "-webkit-baseline-middle",
                                              }}
                                            >
                                              <tbody>
                                                <tr height="25" style={{ verticalAlign: "middle" }}>
                                                  <td style={{ padding: "0px", color: "rgb(51,51,51)" }}>
                                                    <a
                                                      href={`tel:${employee.phone.replace(/[^0-9]/g, "")}`}
                                                      color="#333333"
                                                      style={{ color: "rgb(51,51,51)", fontSize: "12px" }}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                    >
                                                      {employee.phone}
                                                    </a>
                                                  </td>
                                                </tr>
                                                <tr height="25" style={{ verticalAlign: "middle" }}>
                                                  <td style={{ padding: "0px" }}>
                                                    <a
                                                      href="https://movement.io"
                                                      color="#333333"
                                                      style={{ color: "rgb(51,51,51)", fontSize: "12px" }}
                                                      target="_blank"
                                                      rel="noreferrer"
                                                    >
                                                      movement.io
                                                    </a>
                                                  </td>
                                                </tr>
                                                {employee.scheduleLink && (
                                                  <tr height="25" style={{ verticalAlign: "middle" }}>
                                                    <td>
                                                      <a
                                                        href={employee.scheduleLink}
                                                        color="#333333"
                                                        style={{ color: "rgb(51,51,51)", fontSize: "12px" }}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                      >
                                                        Create Media that Moves: Schedule Here
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
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <table
                      cellPadding="0"
                      cellSpacing="0"
                      style={{ verticalAlign: "-webkit-baseline-middle", fontFamily: "Arial" }}
                    >
                      <tbody style={{ color: "rgb(255,255,255)" }}>
                        <tr>
                          <td height="4"></td>
                        </tr>
                      </tbody>
                      <tbody style={{ color: "rgb(255,255,255)" }}>
                        <tr></tr>
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
