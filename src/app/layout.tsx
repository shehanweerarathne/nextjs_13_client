import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppBar, Container, CssBaseline, Toolbar } from "@mui/material";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar>
            <Link href="/" style={{ marginRight: 15, textDecoration: "none" }}>
              Dashboard
            </Link>
            <Link
              href="/products/new"
              style={{ marginRight: 15, textDecoration: "none" }}
            >
              Product
            </Link>
            <Link
              href="/products"
              style={{ marginRight: 15, textDecoration: "none" }}
            >
              Products
            </Link>
          </Toolbar>
        </AppBar>
        <Container>{children}</Container>
      </body>
    </html>
  );
}
