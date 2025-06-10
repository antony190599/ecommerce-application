/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import "./globals.css";
// import {AppRouterCacheProvider} from '@mui/material-nextjs/v15-appRouter';
import { useEffect, useState, Suspense } from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "brick-theme-ui";
import GlobalStyles from "@/GlobalStyles";
import { CartProvider } from "@/providers/CartProvider";
import { ConfigProvider } from "@/providers/ConfigProvider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        {/* <AppRouterCacheProvider> */}
        <SessionProvider>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <CartProvider>
              <ConfigProvider>
                {children}
                <Suspense fallback={<div>Loading...</div>}>
                </Suspense>
              </ConfigProvider>
            </CartProvider>
          </ThemeProvider>
        </SessionProvider>
        {/* </AppRouterCacheProvider> */}
        
      </body>
    </html>
  );
}
