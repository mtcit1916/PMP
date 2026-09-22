import "./globals.css";

export const metadata = {
  title: "PMP Trainer",
  description: "تطبيق تدريب تفاعلي لأسئلة اختبار PMP",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#3b5bdb",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
      </head>
      <body className="bg-slate-950 text-slate-100 min-h-screen">
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function () {
                  navigator.serviceWorker.register('/service-worker.js').catch(function(err){
                    console.log('SW registration failed', err);
                  });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
