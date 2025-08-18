import * as logos from "@/assets/logos";

export async function getTopProducts() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return [
    {
      image: "/images/product/product-01.png",
      name: "Apple Watch Series 7",
      category: "Electronics",
      price: 296,
      sold: 22,
      profit: 45,
    },
    {
      image: "/images/product/product-02.png",
      name: "Macbook Pro M1",
      category: "Electronics",
      price: 546,
      sold: 12,
      profit: 125,
    },
    {
      image: "/images/product/product-03.png",
      name: "Dell Inspiron 15",
      category: "Electronics",
      price: 443,
      sold: 64,
      profit: 247,
    },
    {
      image: "/images/product/product-04.png",
      name: "HP Probook 450",
      category: "Electronics",
      price: 499,
      sold: 72,
      profit: 103,
    },
  ];
}

export async function getInvoiceTableData() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1400));

  return [
    {
      name: "Free package",
      price: 0.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Paid",
    },
    {
      name: "Business Package",
      price: 99.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Unpaid",
    },
    {
      name: "Standard Package",
      price: 59.0,
      date: "2023-01-13T18:00:00.000Z",
      status: "Pending",
    },
  ];
}

export async function getTopHistories() {
  // Fake delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return [
    {
      name: "مشکل حقوقی اول",
      visitors: ' 1403/11/20',
      revenues: logos.Conclusion,
      status: 'Done',
      labael_status: 'انجام شده',
      before: 8,
      logo: logos.google,
    },
    {
      name: "مشکل حقوقی دوم",
      visitors: '1403/11/20',
      revenues: logos.Conclusion,
      status: 'Pending',
      labael_status: 'در دست اقدام',
      before: 18,
      logo: logos.x,
    },
    {
      name: "مشکل حقوقی سوم",
      visitors: '1403/11/20',
      revenues: logos.Conclusion,
      status: 'Notdone',
      labael_status: 'کنسل شده',
      before: 26,
      logo: logos.github,
    },
    {
      name: "مشکل حقوقی چهارم",
      visitors: '1403/11/20',
      revenues:logos.Conclusion,
      status: 'Done',
      labael_status: 'انجام شده',
      before: 38,
      logo: logos.vimeo,
    },
    {
      name: "مشکل حقوقی پنجم",
      visitors: '1403/11/20',
      revenues:logos.Conclusion,
      status: 'Notdone',
      labael_status: 'کنسل شده',
      before: 67,
      logo: logos.facebook,
    },
  ];
}
