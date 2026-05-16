"use strict";

const { version } = require("./package.json");

const DEFAULT_BASE_URL = "https://api.novaqore.ai";

class NovaQoreAI {
  constructor(options = {}) {
    this.version = version;
    this.description = "NovaQore AI Private LLM";
    this.baseUrl = (options.base_url || DEFAULT_BASE_URL).replace(/\/$/, "");
    this.idtoken = options.idtoken || null;
    this.chat = this.chat.bind(this);
  }

  async chat({ messages, tools = [], tool_choice = "auto", stream = true } = {}) {
    const controller = new AbortController();
    const abort = () => controller.abort();

    const headers = { "Content-Type": "application/json" };
    if (this.idtoken) headers["Authorization"] = `Bearer ${this.idtoken}`;

    const res = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: "POST",
      headers,
      signal: controller.signal,
      body: JSON.stringify({
        messages,
        stream,
        tools,
        tool_choice,
      }),
    });

    if (!stream) {
      const result = await res.json();
      return { result, abort };
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();

    const iterator = (async function* () {
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

    return { stream: iterator, abort };
  }
}

module.exports = NovaQoreAI;
