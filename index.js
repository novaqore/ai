"use strict";

const { version } = require("./package.json");

const DEFAULT_BASE_URL = "https://api.novaqore.ai";

class NovaQoreAI {
  constructor(options = {}) {
    this.version = version;
    this.description = "NovaQore AI Private LLM";
    this.baseUrl = (options.base_url || DEFAULT_BASE_URL).replace(/\/$/, "");
    this.chat = this.chat.bind(this);
  }

  async chat(messages, tools = []) {
    const res = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        stream: true,
        tools,
      }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    const stream = (async function* () {
      let buffer = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop();

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith("data: ")) continue;

          const json = trimmed.slice(6);
          if (json === "[DONE]") continue;

          yield JSON.parse(json);
        }
      }
    })();

    return { stream };
  }
}

module.exports = NovaQoreAI;
