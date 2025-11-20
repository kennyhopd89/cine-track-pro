import { Festival, Project } from "@/types";

export function generateEmailTemplate(
    festival: Festival,
    project: Project,
    screenerLink: string,
    screenerPass: string
): string {
    return `Dear ${festival.name} Team,

We are thrilled to submit our latest film, "${project.title}", for consideration at ${festival.name}.

Directed by ${project.director}, "${project.title}" is a project we are incredibly proud of, and we believe it would be a great fit for your program.

Here are the screener details for your review:
------------------------------------------------
Film Title: ${project.title}
Screener Link: ${screenerLink}
Password: ${screenerPass}
------------------------------------------------

Please let us know if you require any additional materials or information. Thank you for your time and consideration.

Best regards,

The "${project.title}" Production Team`;
}
