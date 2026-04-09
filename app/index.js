const express = require("express");
const path = require("path");
const { DynamoDBClient } = require("@aws-sdk/client-dynamodb");
const { DynamoDBDocumentClient, QueryCommand, ScanCommand } = require("@aws-sdk/lib-dynamodb");

const app = express();
const PORT = process.env.PORT || 3000;
const TABLE_NAME = process.env.TABLE_NAME || "prismatic-soul";
const ASSET_BASE = process.env.ASSET_BASE_URL || "";

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-west-2" });
const ddb = DynamoDBDocumentClient.from(client);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

async function queryByType(entityType) {
  const result = await ddb.send(new QueryCommand({
    TableName: TABLE_NAME,
    KeyConditionExpression: "entityType = :t",
    ExpressionAttributeValues: { ":t": entityType },
  }));
  return result.Items || [];
}

app.get("/", async (_req, res) => {
  try {
    const characters = await queryByType("CHARACTER");
    const worlds = await queryByType("WORLD");
    res.render("home", { characters, worlds, assetBase: ASSET_BASE });
  } catch (err) {
    console.error("Home error:", err);
    res.status(500).render("error", { message: "Failed to load campaign data." });
  }
});

app.get("/characters", async (_req, res) => {
  try {
    const characters = await queryByType("CHARACTER");
    res.render("characters", { characters, assetBase: ASSET_BASE });
  } catch (err) {
    console.error("Characters error:", err);
    res.status(500).render("error", { message: "Failed to load characters." });
  }
});

app.get("/worlds", async (_req, res) => {
  try {
    const worlds = await queryByType("WORLD");
    res.render("worlds", { worlds, assetBase: ASSET_BASE });
  } catch (err) {
    console.error("Worlds error:", err);
    res.status(500).render("error", { message: "Failed to load worlds." });
  }
});

app.get("/lore", (_req, res) => {
  res.render("lore", { assetBase: ASSET_BASE });
});

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.listen(PORT, () => console.log(`Prismatic Soul listening on port ${PORT}`));
