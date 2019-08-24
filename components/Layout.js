import React from "react";
import Head from "next/head";
import Nav from "./nav";

const Layout = ({ header, children }) => (
  <div className="outer">
    <Head>
      <title>{header}</title>
    </Head>
    <div className="inner">
      <Nav />
      <main>{children}</main>
      <style jsx global>{`
        body {
          margin: 20px;
          padding: 0;
          font-family: sans-serif;
        }
        main {
          padding-top: 2rem;
        }
        .outer {
          display: flex;
          justify-content: center;
        }
        .inner {
          width: 80%;
        }
      `}</style>
    </div>
  </div>
);

export default Layout;
