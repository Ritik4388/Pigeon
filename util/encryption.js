const crypto = require("crypto");
require("dotenv").config();

const algorithm = "aes-256-cbc";
const KEY = process.env.KEY; 
const iv = crypto.randomBytes(16);

function encryptMessage(message) {
  const cipher = crypto.createCipheriv(algorithm, KEY, iv);
  let encrypted = cipher.update(message, "utf8", "hex");
  encrypted += cipher.final("hex");
  return iv.toString("hex") + encrypted;
}

function decryptMessage(encryptedMessage) {
  const iv = Buffer.from(encryptedMessage.slice(0, 32), "hex");
  const decipher = crypto.createDecipheriv(algorithm, KEY, iv);
  let decrypted = decipher.update(encryptedMessage.slice(32), "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}

module.exports = {
  encryptMessage,
  decryptMessage,
};
