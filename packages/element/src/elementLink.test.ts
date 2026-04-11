import { vi } from "vitest";

import { parseElementLinkFromURL } from "./elementLink";

describe("parseElementLinkFromURL()", () => {
  it("should log malformed urls and return null", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    expect(parseElementLinkFromURL("://not-a-url")).toBe(null);
    expect(errorSpy).toHaveBeenCalledTimes(1);
  });
});
