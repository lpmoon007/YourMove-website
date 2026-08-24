// Phusion Passenger entry point — this is what Plesk's Node.js hosting starts.
//
// Plesk runs Node applications under Passenger, which wants a startup file that creates an
// HTTP server rather than an `npm start` command. Passenger patches `listen()` and supplies
// the socket itself, so the port below is only a fallback for running this file by hand.
//
// Everything else about the app is unchanged: this hands each request to the same Next.js
// handler `next start` would use, including the /api/early-access route.
//
// Plesk needs `npm run build` to have run first — a Next.js production server serves the
// compiled output in .next and will refuse to start without it.

const http = require('http');
const next = require('next');

const port = Number.parseInt(process.env.PORT || '3000', 10);
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => {
        handle(req, res).catch((err) => {
          console.error('[server] request failed:', err);
          res.statusCode = 500;
          res.end('Internal Server Error');
        });
      })
      .listen(port, () => {
        console.log(`[server] Your Move site listening on ${port}`);
      });
  })
  .catch((err) => {
    console.error('[server] Next.js failed to start:', err);
    process.exit(1);
  });
