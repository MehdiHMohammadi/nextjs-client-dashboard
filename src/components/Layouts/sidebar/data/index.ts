import { ComponentType } from "react";
import * as Icons from "../icons";

// تعریف نوع برای آیکون‌ها
type IconComponent = ComponentType<{ className?: string }>;

interface NavItem {
  title: string;
  url: string;
  icon: IconComponent;
  items: never[]; // یا [] برای آرایه خالی
}

interface NavSection {
  label: string;
  items: NavItem[];
}


export const NAV_DATA : NavSection[] = [
  {
    label: "Main Menu",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.Dashboard,
        items: [],
      },
      {
        title: "Legal Assistant",
        url: "/smart-lawyer",
        // url: "https://smart-legal-assistant.vercel.app",
        icon: Icons.Chats,
        items: [],
      },
      {
        title: "History",
        url: "/history",
        icon: Icons.History,
        items: [],
      },
      {
        title: "Law Firms",
        url: "/file-flow",
        icon: Icons.FolderOpen,
        items: [],
      },
      {
        title: "Sent Documents",
        url: "/sent-documents",
        icon: Icons.Send,
        items: [],
      },
      {
        title: "Translation",
        url: "/translate",
        icon: Icons.Translate,
        items: [],
      },
      {
        title: "Chat",
        url: "/chat",
        icon: Icons.chatIcon,
        items: [],
      },
      {
        title: "Edit Information",
        url: "/settings",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Contact Us",
        url: "/profile",
        icon: Icons.Conect,
        items: [],
      },
    
      {
        title: "Calendar",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },

    ],
  },
];
