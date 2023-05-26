import {
  GroupOutlined,
  GroupsOutlined,
  LibraryBooksOutlined,
} from "@mui/icons-material";
import { List } from "@mui/material";

import { WEB_PATHS } from "../../../utility/constants";
import SidebarItem from "./SidebarItem";

const items = [
  { name: "users", to: WEB_PATHS.admin.users, icon: <GroupOutlined /> },
  { name: "classes", to: WEB_PATHS.admin.classes, icon: <GroupsOutlined /> },
  {
    name: "subjects",
    to: WEB_PATHS.admin.subjects,
    icon: <LibraryBooksOutlined />,
  },
];

export default function AdminSidebarItems() {
  return (
    <List>
      {items.map((item) => (
        <SidebarItem key={item.name} item={item} />
      ))}
    </List>
  );
}
