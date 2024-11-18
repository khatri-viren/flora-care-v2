import { ContactEmailTemplate } from "@/components/email-templates/contact-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, message, subject } = body;

    if (!firstName || !email || !message || !subject) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: `${firstName} <updates@FloraCare.in>`,
      to: ["manish@FloraCare.in"],
      subject: subject,
      react: ContactEmailTemplate({
        firstName,
        lastName,
        email,
        message,
        subject,
      }),
    });

    if (error) {
      return new Response(JSON.stringify({ error }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500,
    });
  }
}
