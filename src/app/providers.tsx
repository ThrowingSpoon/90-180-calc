// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
// import ReactQueryClientProvider from '@/components/ReactQueryClientProvider';
import { ThemeProvider } from '@/components/ThemeProvider';
import './globals.css';

export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
    >
      {/* <ReactQueryClientProvider> */}
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      {/* </ReactQueryClientProvider> */}
    </ThemeProvider>
  );
}
