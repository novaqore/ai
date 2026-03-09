<h1 align="center">NovaQore AI</h1>

<p align="center">
  <img src="assets/logo.png" alt="NovaQore AI" width="120" />
  <br><br>
  <strong>@novaqore/ai</strong>
  <br>
  The world's first private, quantum-encrypted LLM client.
  <br><br>
  <a href="https://www.npmjs.com/package/@novaqore/ai"><img src="https://img.shields.io/npm/v/@novaqore/ai?color=blue&label=npm" alt="npm version" /></a>
  <a href="https://github.com/novaqore/ai/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-green" alt="license" /></a>
  <a href="https://img.shields.io/node/v/@novaqore/ai"><img src="https://img.shields.io/node/v/@novaqore/ai?color=brightgreen" alt="node version" /></a>
  <a href="https://discord.gg/novaqore"><img src="https://img.shields.io/discord/1234567890?color=5865F2&label=discord&logo=discord&logoColor=white" alt="Discord" /></a>
  <br><br>
  <a href="https://novaqore.ai/developer"><strong>🔑 Get Your Quantum Keys</strong></a> &nbsp;|&nbsp;
  <a href="https://novaqore.ai"><strong>🌐 Website</strong></a> &nbsp;|&nbsp;
  <a href="https://novaqore.ai/roadmap"><strong>🗺️ Roadmap</strong></a> &nbsp;|&nbsp;
  <a href="https://novaqore.ai/white-papers"><strong>📄 White Papers</strong></a>
</p>

---

## The first private, quantum-encrypted LLMs

### The problem

AI is eating the world, and the world is feeding it everything. Customer names, home addresses, credit card numbers, medical records, legal documents, internal business strategy, private conversations. All of it is being sent to large language models every day by millions of developers and businesses.

Most people assume HTTPS keeps that data safe. It does not. HTTPS encrypts the connection between your machine and the server, but that protection has limits. Corporate firewalls and network proxies routinely perform TLS inspection, decrypting and re-encrypting traffic so they can read everything passing through. Load balancers and CDNs terminate TLS at the edge, meaning your data sits in plaintext inside the provider's infrastructure. A compromised certificate or a stolen private key breaks the entire chain. The AI provider itself sees all of your data in the clear on their servers, and in most cases they log it, store it, and reserve the right to use it.

And then there is the future. Quantum computers are advancing fast. Attackers and nation-states are already recording encrypted internet traffic today with the intention of decrypting it later once quantum hardware catches up. This is called "harvest now, decrypt later," and it is not theoretical. It is happening. Every sensitive prompt you send over standard HTTPS today is a liability tomorrow.

### The solution

NovaQore AI is a private LLM client created by [NovaQore](https://novaqore.ai). We built it because HTTPS alone is not enough to protect what people are feeding into AI.

**We run our own large language models on 🇺🇸 US-based infrastructure.** No third-party AI providers. No data leaving the country. No shared multi-tenant GPU clusters where your prompts sit next to someone else's. Our servers, our models, our network.

**Every request is encrypted end-to-end with post-quantum cryptography.** Before your data ever leaves your machine, it is locked using **CRYSTALS-Kyber** (Kyber1024 key encapsulation) and **AES-256-GCM**. This is not HTTPS. This is an additional layer of encryption on top of it. Even if someone breaks the TLS connection, intercepts traffic at a proxy, or sits inside the network infrastructure, they see nothing but random bytes. The server decrypts your prompt only in memory, runs the model, encrypts the response with the same shared secret, and sends it back. Fresh cryptographic keys are generated for every single request. Nothing is reused. Nothing is cached. Nothing is logged.

**The encryption is quantum-safe.** CRYSTALS-Kyber is a NIST-standardized post-quantum algorithm. Even if a future quantum computer could break today's TLS, it cannot break Kyber. Your data is protected now and it stays protected decades from now.

This is not a proxy. This is not a wrapper. This is a fully private AI pipeline from your code to our GPUs, with post-quantum encryption at every step.

### What a traditional LLM request looks like

```
POST /v1/chat/completions
x-api-key: sk-NqR7xT9vKmLpWz3bYhUd    <- your key, fully exposed
x-uid: usr_8f3a1b2c

{ "messages": [{ "role": "user", "content": "What is the meaning of life?" }] }
```

Everything is readable. Your key, your identity, your prompt.

### What the same request looks like through NovaQore AI

```
POST /v1/chat/completions

{
  "uid": "usr_8f3a1b2c",
  "keyId": "OnHODAr8kb6r5iUaZk6",
  "ciphertext": "K3mVpQ8xTz1Rf5wNyB7uHcLgA0jXoE4sDi9vMaG2kY...==",
  "encrypted": "mNx8Kv2QpLrT5wYzBf1HcOjXgA4sEi7uDa9RtM3kWb...=="
}
```

Random bytes. No API key. No readable content. The response comes back encrypted the same way.

---

## Who is NovaQore AI for

### ✅ Built for

- ✅ **Healthcare and medical companies** handling patient data, HIPAA-regulated workflows, and clinical AI
- ✅ **Financial institutions** processing sensitive transactions, risk models, and customer data
- ✅ **Legal firms** working with privileged communications, contracts, and case strategy
- ✅ **Government agencies** that require data sovereignty and classified-level privacy
- ✅ **Defense contractors** building AI into systems where exposure is not an option
- ✅ **Enterprise teams** with internal data that cannot leave a controlled pipeline
- ✅ **Startups with proprietary IP** who need AI without leaking trade secrets to third-party providers
- ✅ **Developers building for regulated industries** where compliance requires encryption at rest and in transit
- ✅ **Anyone who believes their AI conversations are nobody else's business**

### ❌ Not built for

- ❌ Illegal activity of any kind
- ❌ Spying, stalking, or surveillance
- ❌ Generating content that exploits or harms others
- ❌ Mass data collection or scraping
- ❌ Anything that violates local, state, or federal law

---

## What makes NovaQore AI different

| | Traditional LLM API | NovaQore AI |
|---|---|---|
| Your prompts | Plaintext, readable by anyone in the middle | Quantum-encrypted, unreadable in transit |
| Your API key | Exposed in headers on every request | Never sent. Replaced by quantum handshake |
| Key exchange | None | Kyber1024 (post-quantum safe) |
| Per-request keys | No, same key forever | Yes, fresh keys every single call |
| Infrastructure | Shared, third-party, often overseas | Dedicated 🇺🇸 US-based servers |
| Quantum-safe | No | Yes |

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

### 1. Drop in your service file and go

Download your `novaqore-service-*.json` from the [developer dashboard](https://novaqore.ai/developer) and drop it in your project root:

```javascript
import NovaQoreAI from "@novaqore/ai";

const nq = new NovaQoreAI();

const res = await nq.chat([
  { role: "user", content: "Hello" }
]);

console.log(res.choices[0].message.content);
```

That's it. NovaQore AI auto-detects the service file. Zero config.

### 2. Or pass the path explicitly

```javascript
const nq = new NovaQoreAI("./novaqore-service-MkT3xYpLqN8vRwS1.json");
```

### 3. Or use environment variables

```env
NOVAQORE_UID=your-user-id
NOVAQORE_QUANTUM_KEY=your-base64-quantum-key
NOVAQORE_KEY_ID=your-key-id
```

```javascript
const nq = new NovaQoreAI({
  uid: process.env.NOVAQORE_UID,
  quantumKey: process.env.NOVAQORE_QUANTUM_KEY,
  keyId: process.env.NOVAQORE_KEY_ID,
});
```

---

## Examples

### System prompt

```javascript
const res = await nq.chat([
  { role: "system", content: "You are a helpful assistant that responds in haikus." },
  { role: "user", content: "Tell me about the ocean" }
]);
```

### Tool use

```javascript
const res = await nq.chat(
  [{ role: "user", content: "What's the weather in NYC?" }],
  {
    tools: [
      {
        type: "function",
        function: {
          name: "get_weather",
          description: "Get weather for a location",
          parameters: {
            type: "object",
            properties: {
              location: { type: "string", description: "City name" }
            },
            required: ["location"]
          }
        }
      }
    ]
  }
);

const toolCall = res.choices[0].message.tool_calls[0];
console.log(toolCall.function.name);       // "get_weather"
console.log(toolCall.function.arguments);  // '{"location":"New York City"}'
```

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `temperature` | float | - | Sampling temperature (0-2) |
| `stream` | bool | `false` | Stream response |
| `tools` | array | - | Tool definitions |
| `tool_choice` | string | - | Tool selection mode |

### Health check

```javascript
const status = await nq.health();
```

---

## Zero Dependencies

NovaQore AI vendors all of its cryptographic libraries. Kyber1024 and SHA-3 are bundled directly in `lib/`. There are no external npm dependencies. No supply chain risk. The only requirement is Node 18 or higher.

---

## Roadmap

We are actively building the next generation of private AI infrastructure. Multi-model support, streaming encryption, and more.

**[View the Roadmap](https://novaqore.ai/roadmap)**

---

## White Papers

Technical deep dives into the cryptography, architecture, and threat models behind NovaQore AI. How we protect your data, why we chose Kyber1024, and what post-quantum safety actually means in practice.

**[Read the White Papers](https://novaqore.ai/white-papers)**

---

## Community

We are building this in the open. Join us.

<p>
  <a href="https://discord.gg/novaqore"><strong>Discord</strong></a> &nbsp;|&nbsp;
  <a href="https://x.com/novaqore"><strong>X (Twitter)</strong></a> &nbsp;|&nbsp;
  <a href="https://tiktok.com/@novaqore"><strong>TikTok</strong></a> &nbsp;|&nbsp;
  <a href="https://youtube.com/@novaqore"><strong>YouTube</strong></a>
</p>

---

## Credits

- [CRYSTALS-Kyber](https://github.com/antontutoveanu/crystals-kyber-javascript) - Post-quantum key encapsulation (Kyber1024)
- [sha3](https://github.com/phusion/node-sha3) - Keccak/SHA-3 hashing

## Disclaimer

NovaQore AI is provided as-is. We do not store your conversations. We do not log your prompts or responses. We do not use your data to train models. Your messages are encrypted on your machine, decrypted only long enough to run the model, and the response is encrypted before it leaves our server. We do not have access to the content of your requests and we do not keep copies.

We built NovaQore AI to give people and businesses a genuinely private way to use AI. That said, NovaQore AI is not a tool for illegal activity. We do not tolerate unlawful use of our service. While we cannot see your data, we will cooperate with law enforcement when presented with a valid legal order as required by law.

By using NovaQore AI, you agree to use it responsibly and in compliance with all applicable laws.

## License

MIT

---

<p align="center">
  Powered by <a href="https://novaqore.ai">NovaQore Tech</a>
</p>
