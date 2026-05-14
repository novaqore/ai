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
    const controller = new AbortController();

    const res = await fetch(`${this.baseUrl}/v1/chat/completions`, {
      method: "POST",
      signal: controller.signal,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages,
        stream: true,
        tools,
      }),
    });

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    const stdin = process.stdin;

    const onKey = (key) => {
      if (key.toString() !== "") return;
      controller.abort();
      try { reader.cancel().catch(() => {}); } catch {}
      try { stdin.removeListener("data", onKey); } catch {}
      try { stdin.setRawMode(false); } catch {}
      try { stdin.pause(); } catch {}
    };

    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onKey);

    const stream = (async function* () {
      let buffer = "";

      try {
        while (true) {
          let value, done;
          try {
            ({ value, done } = await reader.read());
          } catch (err) {
            if (err?.name === "AbortError") break;
            throw err;
          }
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
      } finally {
        try { stdin.removeListener("data", onKey); } catch {}
        try { stdin.setRawMode(false); } catch {}
        try { stdin.pause(); } catch {}
      }
    })();

    return { stream };
  }
}

module.exports = NovaQoreAI;
