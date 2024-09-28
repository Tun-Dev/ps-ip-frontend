import type { IconType } from "react-icons";

export type DropdownOption = {
  readonly label: string;
  readonly value: string;
  readonly icon?: IconType;
};
