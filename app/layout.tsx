import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'محفظة ليرات',
  description: 'تجربة مالية متكاملة مع ليرات كل خدماتك في متناول يدك.  حمّل تطبيق ليرات الآن واستمتع بإدارة أموالك بكل سهولة وأمان من هاتفك الذكي',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body >{children}
      <footer >
        <p className='text-gray-500 text-sm text-center bg-[#3a3a3a]'>© جميع الحقوق محفوظة. محفظة ليرات 2025 </p></footer></body>
    </html>
  );
}
