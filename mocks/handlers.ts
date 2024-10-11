import { graphql, HttpResponse } from "msw";

export const handlers = [
  graphql.link("https://example.com").query("Foo", () => {
    return HttpResponse.json({
      data: {
        foo: "bar",
      },
    });
  }),
];
