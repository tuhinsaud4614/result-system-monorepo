export interface HeadCell<Key extends string> {
  disablePadding?: boolean;
  id: Key;
  label: string;
}

export type SortOrder = "asc" | "desc";
