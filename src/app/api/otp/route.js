import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { phoneNumber } = await req.json();
    if (!phoneNumber) {
      return NextResponse.json(
        { message: "شماره موبایل الزامی است" },
        { status: 400 }
      );
    }
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // اینجا می‌تونید منطق ارسال OTP به شماره موبایل رو اضافه کنید
    return NextResponse.json(
      { otp, message: "OTP با موفقیت ارسال شد" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "خطا در سرور: " + error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: "فقط متد POST مجاز است" },
    { status: 405 }
  );
}