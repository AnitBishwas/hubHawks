import "dotenv/config";
import e from "express";
import { createServer as createViteServer } from "vite";
import path, { resolve } from "path";
import fs from "fs";

const PORT = process.env.PORT || 8080;
const isDev = process.env.NODE_ENV === "dev";

const createServer = async (root = process.cwd()) => {
  const app = e();
  app.use(e.json());
  

  if (isDev) {
    const vite = await createViteServer({
      root: path.resolve(process.cwd(), "client"),
      server: {
        middlewareMode: true,
        hmr: {
          server: app.listen(PORT, () => {
            console.log("Dev server is running on port" + PORT);
          }),
        },
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
    app.use("*splat", async (req, res) => {
      const url = req.originalUrl;
      let template = fs.readFileSync(
        path.resolve(process.cwd(), "client", "index.html"),
        "utf-8"
      );
      template = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(template);
    });
  } else {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );

    app.use(compression());
    app.use(serveStatic(resolve("dist/client")));
    app.use("/*splat", (req, res, next) => {
      res
        .status(200)
        .set("Content-Type", "text/html")
        .send(fs.readFileSync(`${root}/dist/client/index.html`));
    });
  }
  return { app };
};

if (isDev) {
  createServer();
}
