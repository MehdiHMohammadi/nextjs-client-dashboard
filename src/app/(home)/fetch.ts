export async function getOverviewData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return {
    views: {
      value: 3456,
      growthRate: 0.43,
    },
    profit: {
      value: 4220,
      growthRate: 4.35,
    },
    products: {
      value: 3456,
      growthRate: 2.59,
    },
    users: {
      value: 3456,
      growthRate: -0.95,
    },
  };
}

export async function getChatsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    {
      name: "حسین ناصری",
      profile: "/images/user/user-01.png",
      isActive: true,
      lastMessage: {
        content: "فردا جلسه با خانم رضایی",
        type: "text",
        timestamp: "2024-12-19T14:30:00Z",
        isRead: false,
      },
      unreadCount: 3,
    },
    {
      name: "JustiQ",
      profile: "/images/user/user-03.png",
      isActive: true,
      lastMessage: {
        content: "قرارداد با آقای کلانتری",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "زویا رضایی",
      profile: "/images/user/user-04.png",
      isActive: false,
      lastMessage: {
        content: "فرستادن مدارک",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
    {
      name: "آقای دکتر امین",
      profile: "/images/user/user-05.png",
      isActive: false,
      lastMessage: {
        content: "ساعت جلسه هفته آینده?",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 2,
    },
    {
      name: "میلاد تاکی",
      profile: "/images/user/user-07.png",
      isActive: false,
      lastMessage: {
        content: "ترجمه مدارک آقای JustiQ",
        type: "text",
        timestamp: "2024-12-19T10:15:00Z",
        isRead: true,
      },
      unreadCount: 0,
    },
  ];
}