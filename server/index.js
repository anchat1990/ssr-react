import path from "path";
import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = process.env.PORT || 3006;
const app = express();

app.use(express.static("./build"));

app.get("/anwesha", (req, res) => {
  // send half html
  res.write(
    '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>'
  );
  res.write("<div id='root'>");
  // generate stream
  const stream = ReactDOMServer.renderToNodeStream(<App />);
  stream.pipe(
    res,
    { end: false }
  );
  //finish
  stream.on("end", () => {
    res.write("</div></body></html>");
    res.end();
  });

  //-----------------------
  // const app = ReactDOMServer.renderToNodeStream(<App />);

  // const indexFile = path.resolve("./build/index.html");
  // fs.readFile(indexFile, "utf8", (err, data) => {
  //   if (err) {
  //     console.error("Something went wrong:", err);
  //     return res.status(500).send("Oops, better luck next time!");
  //   }
  //
  //   return res.send(
  //     data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  //   );
  // });
});

app.listen(PORT, () => {
  console.log(`🌸🌸🌸🌸🌸 Server is listening on port ${PORT}`);
});
