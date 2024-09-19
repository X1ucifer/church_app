'use client';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../../styles/globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import { Poppins } from 'next/font/google';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUserFromStorage } from '../redux/slices/authSlice';
import 'react-loading-skeleton/dist/skeleton.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import 'rc-time-picker/assets/index.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

const poppins = Poppins({
  subsets: ['latin'],
  style: 'normal',
  weight: ['100'],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <LayoutWithEffect>
          <ToastContainer />
          {children}
        </LayoutWithEffect>
      </QueryClientProvider>
    </Provider>
  );
}

const LayoutWithEffect = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUserFromStorage());
  }, [dispatch]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
};
