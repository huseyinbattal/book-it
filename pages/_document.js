import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage;

    // Run the React rendering logic synchronously
    ctx.renderPage = () =>
      originalRenderPage({
        // Useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // Useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      });

    // Run the parent `getInitialProps`, it now includes the custom `renderPage`
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            type="text/css"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script
            src="https://cdn.jsdelivr.net/npm/react/umd/react.production.min.js"
            crossOrigin
          ></Script>

          <Script
            src="https://cdn.jsdelivr.net/npm/react-dom/umd/react-dom.production.min.js"
            crossOrigin
          ></Script>

          <Script
            src="https://cdn.jsdelivr.net/npm/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossOrigin
          ></Script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
