import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDoc extends Document {
  render() {
    return (
      <Html className="h-full" lang="en">
        <Head />
        <body className="w-full h-full text-gray-900 bg-gray-100 font-poppins">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDoc;
