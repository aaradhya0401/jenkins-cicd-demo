
const http = require("http");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      status: "healthy",
      application: "jenkins-cicd-demo"
    }));
    return;
  }

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <title>Jenkins CI/CD Demo</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background: #f1f5f9;
              color: #1e293b;
              display: grid;
              place-items: center;
              min-height: 100vh;
              margin: 0;
            }
            main {
              background: white;
              padding: 40px;
              border-radius: 16px;
              text-align: center;
              box-shadow: 0 8px 30px #00000012;
            }
            h1 { color: #2563eb; }
            .status { color: #15803d; font-weight: bold; }
          </style>
        </head>
        <body>
          <main>
            <h1>Jenkins CI/CD Demo</h1>
            <p>Your application is running successfully!</p>
            <p class="status">Deployment Status: Active</p>
            <p>Built and deployed using Jenkins and Docker.</p>
          </main>
        </body>
      </html>
    `);
    return;
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`Application running on port ${PORT}`);
});
