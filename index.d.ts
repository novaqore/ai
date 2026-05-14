declare class NovaQoreAI {
  constructor(options?: NovaQoreAI.Options);

  version: string;
  description: string;
  baseUrl: string;

  chat(
    messages: NovaQoreAI.Message[],
    tools?: NovaQoreAI.Tool[]
  ): Promise<NovaQoreAI.ChatResponse>;
}

declare namespace NovaQoreAI {
  interface Options {
    /** Override the API base URL. Defaults to https://api.novaqore.ai */
    base_url?: string;
  }

  interface Message {
    role: "system" | "user" | "assistant" | "tool";
    content: string;
  }

  interface Tool {
    type: "function";
    function: {
      name: string;
      description?: string;
      parameters?: Record<string, unknown>;
    };
  }

  interface ChatResponse {
    /** Async iterator of chat completion chunks. */
    stream: AsyncGenerator<ChatCompletionChunk, void, unknown>;
  }

  interface ChatCompletionChunk {
    id: string;
    object: string;
    created: number;
    model: string;
    system_fingerprint?: string;
    choices: ChatChoice[];
  }

  interface ChatChoice {
    index: number;
    delta: ChatDelta;
    finish_reason: string | null;
  }

  interface ChatDelta {
    role?: string;
    content?: string | null;
    tool_calls?: ToolCall[];
  }

  interface ToolCall {
    index?: number;
    id?: string;
    type?: "function";
    function?: {
      name?: string;
      arguments?: string;
    };
  }
}

export = NovaQoreAI;
