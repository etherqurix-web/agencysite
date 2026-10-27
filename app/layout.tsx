import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/space-grotesk';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource/michroma';
import './globals.css';

export const metadata: Metadata = {
  title: 'Aetherquorix — AI, Design & 3D Technology Studio',
  description:
    'Aetherquorix is an AI-first technology and creative studio building intelligent automation, digital products, graphic design, and high-end 3D interior and exterior visualization.',
  icons: { icon: '/icon.png', apple: '/apple-icon.png' },
};

export const viewport: Viewport = {
  themeColor: '#F5F8FC',
  colorScheme: 'light dark',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "try { if (localStorage.getItem('aq-theme') === 'dark') document.documentElement.dataset.theme = 'dark'; } catch (_) {}",
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
