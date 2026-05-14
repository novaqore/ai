<h1 align="center">NovaQore AI</h1>

<p align="center">
  <img src="assets/logo.png" alt="NovaQore AI" width="120" />
  <br><br>
  <strong>@novaqore/ai</strong>
  <br>
  Private LLM client.
  <br><br>
  <a href="https://www.npmjs.com/package/@novaqore/ai"><img src="https://img.shields.io/npm/v/@novaqore/ai?color=blue&label=npm" alt="npm version" /></a>
  <a href="https://github.com/novaqore/ai/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license" /></a>
  <a href="https://img.shields.io/node/v/@novaqore/ai"><img src="https://img.shields.io/node/v/@novaqore/ai?color=brightgreen" alt="node version" /></a>
  <a href="https://discord.gg/JAzgcf6r"><img src="https://img.shields.io/discord/1234567890?color=5865F2&label=discord&logo=discord&logoColor=white" alt="Discord" /></a>
  <br><br>
  <a href="https://novaqore.ai/developer"><strong>🔑 Get Your API Keys</strong></a> &nbsp;|&nbsp;
  <a href="https://novaqore.ai"><strong>🌐 Website</strong></a> &nbsp;|&nbsp;
  <a href="https://novaqore.ai/roadmap"><strong>🗺️ Roadmap</strong></a> &nbsp;|&nbsp;
  <a href="https://novaqore.ai/white-papers"><strong>📄 White Papers</strong></a>
</p>

---

## Install

```bash
npm install @novaqore/ai
```

```javascript
// CommonJS
const NovaQoreAI = require("@novaqore/ai");

// ES Module
import NovaQoreAI from "@novaqore/ai";
```

---

## Quick Start

Get your API keys from the [developer dashboard](https://novaqore.ai/developer).

### Streaming

```javascript
const { chat } = new NovaQoreAI();

const messages = [
    {role: "system", content: "Your name is Atom"}
]

const { stream } = await chat(messages);

for await (const chunk of stream) {
      const delta = chunk.choices[0]?.delta;
      console.log(delta)
}
```

Call `stop()` at any time to abort the stream (e.g. wire it to a stop button in your UI).

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `tools` | array | - | Tool definitions |

## Roadmap

We are actively building the next generation of private AI infrastructure. Multi-model support, streaming improvements, and more.

**[View the Roadmap](https://novaqore.ai/roadmap)**

## Community

We are building this in the open. Join us.

<p>
  <a href="https://discord.gg/JAzgcf6r"><strong>Discord</strong></a> &nbsp;|&nbsp;
  <a href="https://x.com/novaqore"><strong>X (Twitter)</strong></a> &nbsp;|&nbsp;
  <a href="https://tiktok.com/@novaqore"><strong>TikTok</strong></a> &nbsp;|&nbsp;
  <a href="https://youtube.com/@novaqore"><strong>YouTube</strong></a>
</p>

## Disclaimer

NovaQore AI is provided as-is. We do not store your conversations, log your prompts or responses, or use your data to train models. We do not keep copies of your requests.

We built NovaQore AI to give people and businesses a genuinely private way to use AI. That said, NovaQore AI is not a tool for illegal activity. We do not tolerate unlawful use of our service. While we cannot see your data, we will cooperate with law enforcement when presented with a valid legal order as required by law.

By using NovaQore AI, you agree to use it responsibly and in compliance with all applicable laws.

## License

MIT

---

<p align="center">
  <a href="https://chat.novaqore.ai"><strong>💬 Start Chat — Private AI</strong></a>
  <br><br>
  Powered by <a href="https://novaqore.ai">NovaQore Tech</a>
</p>
