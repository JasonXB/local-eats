import React from "react";
import Head from "next/head";

export default function TabTitle({ title }) {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="description" content="Local Eats Restaurant finder"></meta>
    </Head>
  );
}
