//More information in https://swagger.io/specification/
import yaml from "js-yaml";
import fs from "fs";
import path from "path";

const info = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "./openAPIs/info.yml"), "utf8"));
const servers = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "./openAPIs/servers.yml"), "utf8"));
const components = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "./openAPIs/components.yml"), "utf8"));

const topSecret = yaml.safeLoad(fs.readFileSync(path.resolve(__dirname, "./openAPIs/topSecret/postTopSecret.yml"), "utf8"));
export const swaggerDocument = {
  openapi: "3.0.3",
  info,
  servers,
  components,
  tags: [
    { name: "TopSecret" },
  ],
  paths: {
    "/topsecret": {
      post: topSecret
    }
  },
}