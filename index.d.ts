declare class NovaQoreAI {
  constructor(options?: NovaQoreAI.Options);

  version: string;
  description: string;
  baseUrl: string;
  idtoken: string | null;

  chat(params: NovaQoreAI.ChatParams & { stream: false }): Promise<NovaQoreAI.ChatResult>;
  chat(params: NovaQoreAI.ChatParams): Promise<NovaQoreAI.ChatResponse>;
}

declare namespace NovaQoreAI {
  interface Options {
    /** Override the API base URL. Defaults to https://api.novaqore.ai */
    base_url?: string;
    /** ID token (e.g. Firebase ID token). Sent as `Authorization: Bearer <token>` on every request when set. */
    idtoken?: string;
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

  type ToolChoice =
    | "auto"
    | "none"
    | "required"
    | { type: "function"; function: { name: string } };

  interface ChatParams {
    messages: Message[];
    tools?: Tool[];
    /** Defaults to "auto". */
    tool_choice?: ToolChoice;
    /** Defaults to true. Set false to receive a single non-streamed result. */
    stream?: boolean;
  }

  interface ChatResponse {
    /** Async iterator of chat completion chunks. */
    stream: AsyncGenerator<ChatCompletionChunk, void, unknown>;
    /** Tear down the request and its underlying connection. The stream's next read rejects with AbortError. */
    abort: () => void;
  }

  interface ChatResult {
    result: ChatCompletion;
    /** No-op once the response has resolved; included for API symmetry with streaming. */
    abort: () => void;
  }

  interface ChatCompletion {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Array<{
      index: number;
      message: {
        role: string;
        content: string | null;
        tool_calls?: ToolCall[];
      };
      finish_reason: string | null;
    }>;
    usage?: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
      prompt_tokens_details?: {
        cached_tokens?: number;
      };
    };
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
