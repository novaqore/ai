const { Encrypt1024 } = require("./lib/kyber1024");
const crypto = require("crypto");
const fs = require("fs");
const path = require("path");

const BASE_URL = "https://api.novaqore.ai";

class NovaQoreAI {
  #uid;
  #quantumKey;
  #keyId;

  constructor(config) {
    if (config === undefined) {
      const files = fs.readdirSync(process.cwd()).filter(f => f.startsWith("novaqore-ai-service-") && f.endsWith(".json"));
      if (files.length === 0) {
        throw new Error("No novaqore-ai-service-*.json file found in current directory");
      }
      config = JSON.parse(fs.readFileSync(path.resolve(files[0]), "utf-8"));
    } else if (typeof config === "string") {
      const filePath = path.resolve(config);
      if (!fs.existsSync(filePath)) {
        throw new Error(`Service file not found: ${filePath}`);
      }
      config = JSON.parse(fs.readFileSync(filePath, "utf-8"));
    }
    if (!config || typeof config !== "object") {
      throw new Error("NovaQoreAI requires { uid, quantumKey, keyId } or a path to a novaqore-ai-service.json file");
    }
    if (!config.uid) {
      throw new Error("uid is required");
    }
    if (!config.quantumKey) {
      throw new Error("quantumKey is required");
    }
    if (!config.keyId) {
      throw new Error("keyId is required");
    }
    this.#uid = config.uid;
    this.#quantumKey = config.quantumKey;
    this.#keyId = config.keyId;
    this.version = "0.1.0";
    this.description = "NovaQore AI - Quantum-encrypted LLM client by NovaQore";
    this.methods = ["chat", "health"];
  }

  async #encryptPayload(payload) {
    const quantumKey = new Uint8Array(Buffer.from(this.#quantumKey, "base64"));

    const [ciphertext, sharedSecret] = await Encrypt1024(quantumKey);

    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv("aes-256-gcm", Buffer.from(sharedSecret), iv);
    const plaintext = Buffer.from(JSON.stringify(payload), "utf-8");
    const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
    const tag = cipher.getAuthTag();

    const packed = Buffer.concat([iv, encrypted, tag]);

    return {
      ciphertext: Buffer.from(ciphertext).toString("base64"),
      encrypted: packed.toString("base64"),
      sharedSecret: Buffer.from(sharedSecret),
    };
  }

  #decryptResponse(encryptedB64, sharedSecret) {
    const buf = Buffer.from(encryptedB64, "base64");
    const iv = buf.subarray(0, 12);
    const tag = buf.subarray(buf.length - 16);
    const ciphertext = buf.subarray(12, buf.length - 16);
    const decipher = crypto.createDecipheriv("aes-256-gcm", sharedSecret, iv);
    decipher.setAuthTag(tag);
    const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
    return JSON.parse(decrypted.toString("utf-8"));
  }

  async chat(messages, options = {}) {
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      throw new Error("Messages must be a non-empty array");
    }

    try {
      const payload = {
        messages,
        temperature: options.temperature,
        stream: options.stream || false,
        ...(options.tools && { tools: options.tools }),
        ...(options.tool_choice && { tool_choice: options.tool_choice }),
      };

      const { ciphertext, encrypted, sharedSecret } = await this.#encryptPayload(payload);

      const res = await fetch(`${BASE_URL}/v1/chat/completions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          uid: this.#uid,
          keyId: this.#keyId,
          ciphertext,
          encrypted,
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        try {
          const parsed = JSON.parse(body);
          throw new Error(parsed.error || `Request failed with status ${res.status}`);
        } catch (e) {
          if (e.message && !e.message.includes("JSON")) throw e;
          throw new Error(`Request failed with status ${res.status}`);
        }
      }

      const { encrypted: encryptedResponse } = await res.json();
      return this.#decryptResponse(encryptedResponse, sharedSecret);
    } catch (err) {
      if (err.message) throw err;
      throw new Error("Failed to connect to NovaQore AI");
    }
  }

  async health() {
    try {
      const res = await fetch(`${BASE_URL}/health`, {
        headers: {
          "x-uid": this.#uid,
        },
      });
      if (!res.ok) {
        throw new Error(`Health check failed with status ${res.status}`);
      }
      return res.json();
    } catch (err) {
      if (err.message) throw err;
      throw new Error("Failed to connect to NovaQore AI");
    }
  }
}

module.exports = NovaQoreAI;
