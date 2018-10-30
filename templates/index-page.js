module.exports = js => `<!doctype html>
<html class="no-js" lang="en">
    <head>
        <title>Pathway Genomics Corporation - Software</title>

        <meta charset="utf-8">
        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="theme-color" content="#2196f3">
        <meta name="mobile-web-app-capable" content="yes">

        <!-- <link rel="apple-touch-icon" href="apple-touch-icon.png"> -->
        <!-- Place favicon.ico in the root directory -->
        <link rel="manifest" href="/manifest.json">
    </head>
    <body>

        <!--[if lt IE 8]>
            <p class="browserupgrade">You are using an <strong>outdated</strong> browser.
            Please <a href="http://browsehappy.com/">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->

        <noscript>
            If you're seeing this message, that means <strong>JavaScript has been disabled on your browser</strong>, please <strong>enable JS</strong> to make this app work.
        </noscript>

        <div id="root"></div>
        <script src="https://cdn.polyfill.io/v2/polyfill.js?features=default,Array.prototype.includes,Array.prototype.find" async></script>
        <script src="${js}" defer></script>
    </body>
</html>
`;