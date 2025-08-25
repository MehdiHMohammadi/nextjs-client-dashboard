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
    label: "منوی اصلی",
    items: [
      {
        title: "داشبورد",
        url: "/",
        icon: Icons.Dashboard,
        items: [],
      },
      {
        title: "دستیار حقوقی",
        url: "/smart-lawyer",
        // url: "https://smart-legal-assistant.vercel.app",
        icon: Icons.Chats,
        items: [],
      },
      {
        title: "تاریخچه",
        url: "/history",
        icon: Icons.History,
        items: [],
      },
      {
        title: "شرکت‌های حقوقی",
        url: "/file-flow",
        icon: Icons.FolderOpen,
        items: [],
      },
      {
        title: "مدارک ارسالی",
        url: "/sent-documents",
        icon: Icons.Send,
        items: [],
      },
      {
        title: "ترجمه",
        url: "/translate",
        icon: Icons.Translate,
        items: [],
      },
      {
        title: "گفتگو",
        url: "/chat",
        icon: Icons.chatIcon,
        items: [],
      },
      {
        title: "ویرایش اطلاعات",
        url: "/settings",
        icon: Icons.User,
        items: [],
      },
      {
        title: "تماس با ما",
        url: "/profile",
        icon: Icons.Conect,
        items: [],
      },
    
      {
        title: "تقویم",
        url: "/calendar",
        icon: Icons.Calendar,
        items: [],
      },

    ],
  },
];
