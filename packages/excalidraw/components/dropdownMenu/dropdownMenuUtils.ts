import React from "react";

const getMenuComponent = (component: string) => (children: React.ReactNode) => {
  return (
    React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) &&
        typeof child.type !== "string" &&
        "displayName" in child.type &&
        child.type.displayName === component,
    ) ?? null
  );
};

export const getMenuTriggerComponent = getMenuComponent("DropdownMenuTrigger");
export const getMenuContentComponent = getMenuComponent("DropdownMenuContent");
export const getSubMenuTriggerComponent = getMenuComponent(
  "DropdownMenuSubTrigger",
);
export const getSubMenuContentComponent = getMenuComponent(
  "DropdownMenuSubContent",
);
