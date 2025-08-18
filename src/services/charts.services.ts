export async function getDevicesUsedData(
  timeFrame?: "دوشنبهthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const data = [
    {
      name: "Desktop",
      percentage: 0.65,
      amount: 1625,
    },
    {
      name: "Tablet",
      percentage: 0.1,
      amount: 250,
    },
    {
      name: "Mobile",
      percentage: 0.2,
      amount: 500,
    },
    {
      name: "Unknown",
      percentage: 0.05,
      amount: 125,
    },
  ];

  if (timeFrame === "yearly") {
    data[0].amount = 19500;
    data[1].amount = 3000;
    data[2].amount = 6000;
    data[3].amount = 1500;
  }

  return data;
}

export async function getPaymentsOverviewData(
  timeFrame?: "دوشنبهthly" | "yearly" | (string & {}),
) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "yearly") {
    return {
      received: [
        { x: 2020, y: 450 },
        { x: 2021, y: 620 },
        { x: 2022, y: 780 },
        { x: 2023, y: 920 },
        { x: 2024, y: 1080 },
      ],
      due: [
        { x: 2020, y: 1480 },
        { x: 2021, y: 1720 },
        { x: 2022, y: 1950 },
        { x: 2023, y: 2300 },
        { x: 2024, y: 1200 },
      ],
    };
  }

  return {
    received: [
      { x: "Jan", y: 0 },
      { x: "Feb", y: 20 },
      { x: "Mar", y: 35 },
      { x: "Apr", y: 45 },
      { x: "May", y: 35 },
      { x: "Jun", y: 55 },
      { x: "Jul", y: 65 },
      { x: "Aug", y: 50 },
      { x: "Sep", y: 65 },
      { x: "Oct", y: 75 },
      { x: "Nov", y: 60 },
      { x: "Dec", y: 75 },
    ],
    due: [
      { x: "Jan", y: 15 },
      { x: "Feb", y: 9 },
      { x: "Mar", y: 17 },
      { x: "Apr", y: 32 },
      { x: "May", y: 25 },
      { x: "Jun", y: 68 },
      { x: "Jul", y: 80 },
      { x: "Aug", y: 68 },
      { x: "Sep", y: 84 },
      { x: "Oct", y: 94 },
      { x: "Nov", y: 74 },
      { x: "Dec", y: 62 },
    ],
  };
}

export async function getWeeksProfitData(timeFrame?: string) {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (timeFrame === "last week") {
    return {
      sales: [
        { x: "شنبه", y: 33 },
        { x: "یکشنبه", y: 44 },
        { x: "دوشنبه", y: 31 },
        { x: "سه شنبه", y: 57 },
        { x: "چهارشنبه", y: 12 },
        { x: "پنج شنبه", y: 33 },
        { x: "جمعه", y: 55 },
      ],
      revenue: [
        { x: "شنبه", y: 10 },
        { x: "یکشنبه", y: 20 },
        { x: "دوشنبه", y: 17 },
        { x: "سه شنبه", y: 7 },
        { x: "چهارشنبه", y: 10 },
        { x: "پنج شنبه", y: 23 },
        { x: "جمعه", y: 13 },
      ],
    };
  }

  return {
    sales: [
      { x: "شنبه", y: 44 },
      { x: "یکشنبه", y: 55 },
      { x: "دوشنبه", y: 41 },
      { x: "سه شنبه", y: 67 },
      { x: "چهارشنبه", y: 22 },
      { x: "پنج شنبه", y: 43 },
      { x: "جمعه", y: 65 },
    ],
    revenue: [
      { x: "شنبه", y: 13 },
      { x: "یکشنبه", y: 23 },
      { x: "دوشنبه", y: 20 },
      { x: "سه شنبه", y: 8 },
      { x: "چهارشنبه", y: 13 },
      { x: "پنج شنبه", y: 27 },
      { x: "جمعه", y: 15 },
    ],
  };
}

export async function getCampaignVisitorsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    total_visitors: 784_000,
    performance: -1.5,
    chart: [
      { x: "S", y: 168 },
      { x: "S", y: 385 },
      { x: "M", y: 201 },
      { x: "T", y: 298 },
      { x: "W", y: 187 },
      { x: "T", y: 195 },
      { x: "F", y: 291 },
    ],
  };
}

export async function getVisitorsAnalyticsData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return [
    168, 385, 201, 298, 187, 195, 291, 110, 215, 390, 280, 112, 123, 212, 270,
    190, 310, 115, 90, 380, 112, 223, 292, 170, 290, 110, 115, 290, 380, 312,
  ].map((value, index) => ({ x: index + 1 + "", y: value }));
}

export async function getCostsPerInteractionData() {
  return {
    avg_cost: 560.93,
    growth: 2.5,
    chart: [
      {
        name: "Google Ads",
        data: [
          { x: "شهریور", y: 15 },
          { x: "مهر", y: 12 },
          { x: "آبان", y: 61 },
          { x: "آذر", y: 118 },
          { x: "دی", y: 78 },
          { x: "بهمن", y: 125 },
          { x: "اسفند", y: 165 },
          { x: "فروردین", y: 61 },
          { x: "اردیبهشت", y: 183 },
          { x: "خرداد", y: 238 },
          { x: "تیر", y: 237 },
          { x: "مرداد", y: 235 },
        ],
      },
      {
        name: "Facebook Ads",
        data: [
          { x: "شهریور", y: 75 },
          { x: "مهر", y: 77 },
          { x: "آبان", y: 151 },
          { x: "آذر", y: 72 },
          { x: "دی", y: 7 },
          { x: "بهمن", y: 58 },
          { x: "اسفند", y: 60 },
          { x: "فروردین", y: 185 },
          { x: "اردیبهشت", y: 239 },
          { x: "خرداد", y: 135 },
          { x: "تیر", y: 119 },
          { x: "مرداد", y: 124 },
        ],
      },
    ],
  };
}