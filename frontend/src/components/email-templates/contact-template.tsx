import * as React from "react";

export interface ContactEmailProps {
  firstName: string;
  lastName: string;
  message: string;
  email: string;
  subject: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailProps>> = ({
  firstName,
  lastName,
  message,
  subject,
  email,
}) => (
  <div
    style={{
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.5",
      color: "#333",
    }}
  >
    <h1 style={{ color: "#414d0b" }}>
      Message From: {firstName} {lastName || ""}
    </h1>
    <p>{email}</p>

    <h3>Subject: {subject}</h3>

    <p>{message}</p>
  </div>
);
