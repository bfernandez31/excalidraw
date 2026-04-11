import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React from "react";
import { vi } from "vitest";

import { t } from "@excalidraw/excalidraw/i18n";

import type { UIAppState } from "@excalidraw/excalidraw/types";

import CustomStats from "./CustomStats";

const { copyTextToSystemClipboard } = vi.hoisted(() => ({
  copyTextToSystemClipboard: vi.fn(),
}));

vi.mock("@excalidraw/excalidraw/clipboard", () => ({
  copyTextToSystemClipboard,
}));

describe("<CustomStats />", () => {
  it("should show a toast when copying the version fails", async () => {
    copyTextToSystemClipboard.mockRejectedValueOnce(new Error("copy failed"));
    const setToast = vi.fn();

    render(
      <CustomStats
        setToast={setToast}
        elements={[]}
        appState={{} as UIAppState}
      />,
    );

    fireEvent.click(screen.getByTitle(t("stats.versionCopy")));

    await waitFor(() => {
      expect(setToast).toHaveBeenCalledWith(
        t("errors.copyToSystemClipboardFailed"),
      );
    });
  });
});
