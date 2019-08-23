import React from "react";
import Head from "next/head";
import Nav from "./nav";

const Layout = ({ header, children }) => (
  <div>
    <Head>
      <title>{header}</title>
    </Head>

    <Nav />
    {children}
    <style jsx global>{`
      body {
        margin: 20px;
        padding: 0;
        font-family: sans-serif;
      }
    `}</style>
  </div>
);

export default Layout;