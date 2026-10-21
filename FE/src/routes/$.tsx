import { createFileRoute } from "@tanstack/react-router";
import { NotFoundPage } from "../components/Pages";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page Not Found — yarnoozah" },
      {
        name: "description",
        content: "This yarnoozah stitch unravelled.",
      },
      {
        property: "og:title",
        content: "Page Not Found — yarnoozah",
      },
      {
        property: "og:description",
        content: "This yarnoozah stitch unravelled.",
      },
      {
        property: "og:type",
        content: "website",
      },
      {
        name: "twitter:card",
        content: "summary",
      },
      {
        name: "robots",
        content: "noindex",
      },
    ],
  }),
  component: NotFoundPage,
});