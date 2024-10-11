/**
 * @vitest-environment node
 */
import request, { gql, GraphQLClient } from "graphql-request";

test("should abort graphql request with client", async () => {
  const controller = new AbortController();
  const client = new GraphQLClient("https://example.com", {
    signal: controller.signal,
  });
  controller.abort();
  const response = client.request(gql`
    query Foo {
      foo
    }
  `);
  await expect(response).rejects.toThrow("This operation was aborted");
});

test("should abort inline graphql request", async () => {
  const controller = new AbortController();
  controller.abort();
  const response = request({
    url: "https://example.com",
    document: gql`
      query Foo {
        foo
      }
    `,
    signal: controller.signal,
  });
  await expect(response).rejects.toThrow("This operation was aborted");
});
