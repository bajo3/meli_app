import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de vehículos',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-[#05030a] text-slate-100">
        {children}
      </body>
    </html>
  );
}
