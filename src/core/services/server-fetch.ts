import "server-only";

import { serverEnv } from "@/core/env/env";

export type ApiSuccess<T> = {
  ok: true;
  data: T;
  status: number;
  message?: string;
};

export type ApiFailure = {
  ok: false;
  status: number | null;
  code:
    | "missing_base_url"
    | "timeout"
    | "network_error"
    | "http_error"
    | "invalid_json"
    | "invalid_response";
  message: string;
  cause?: unknown;
};

export type ApiResult<T> = ApiSuccess<T> | ApiFailure;

type ApiEnvelope<T> = {
  status?: string;
  statusCode?: number;
  message?: string;
  data?: T;
};

type ServerFetchOptions<T> = Omit<RequestInit, "body"> & {
  body?: BodyInit | Record<string, unknown> | null;
  baseUrl?: string;
  timeoutMs?: number;
  parse?: (data: unknown) => T;
};

const DEFAULT_TIMEOUT_MS = 10_000;

export async function serverFetch<T>(
  path: string,
  options: ServerFetchOptions<T> = {},
): Promise<ApiResult<T>> {
  const baseUrl = options.baseUrl ?? serverEnv.apiUrl;

  if (!baseUrl) {
    return {
      ok: false,
      status: null,
      code: "missing_base_url",
      message: "API_URL is not configured.",
    };
  }

  const controller = new AbortController();
  const timeout = setTimeout(
    () => controller.abort(),
    options.timeoutMs ?? DEFAULT_TIMEOUT_MS,
  );

  try {
    const response = await fetch(buildApiUrl(baseUrl, path), {
      ...options,
      body: serializeBody(options.body),
      headers: buildHeaders(options.headers, options.body),
      signal: controller.signal,
    });

    const json = await readJson(response);
    if (!json.ok) {
      return json;
    }

    const envelope = normalizeEnvelope<T>(json.data);
    const status = envelope.statusCode ?? response.status;

    if (!response.ok || status >= 400 || envelope.status === "error") {
      return {
        ok: false,
        status,
        code: "http_error",
        message: envelope.message ?? response.statusText,
      };
    }

    const rawData = envelope.data;
    if (rawData === undefined) {
      return {
        ok: false,
        status,
        code: "invalid_response",
        message: "API response did not include a data payload.",
      };
    }

    try {
      return {
        ok: true,
        status,
        message: envelope.message,
        data: options.parse ? options.parse(rawData) : (rawData as T),
      };
    } catch (error) {
      return {
        ok: false,
        status,
        code: "invalid_response",
        message: "API response data did not match the expected shape.",
        cause: error,
      };
    }
  } catch (error) {
    if (isAbortError(error)) {
      return {
        ok: false,
        status: null,
        code: "timeout",
        message: "API request timed out.",
        cause: error,
      };
    }

    return {
      ok: false,
      status: null,
      code: "network_error",
      message: "API request failed before a response was received.",
      cause: error,
    };
  } finally {
    clearTimeout(timeout);
  }
}

function buildApiUrl(baseUrl: string, path: string) {
  const base = baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`;
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;
  return new URL(normalizedPath, base);
}

function buildHeaders(headers: HeadersInit | undefined, body: unknown) {
  const nextHeaders = new Headers(headers);
  nextHeaders.set("Accept", "application/json");

  if (body && isJsonBody(body) && !nextHeaders.has("Content-Type")) {
    nextHeaders.set("Content-Type", "application/json");
  }

  return nextHeaders;
}

function serializeBody(body: ServerFetchOptions<unknown>["body"]) {
  if (body === null || body === undefined || !isJsonBody(body)) {
    return body as BodyInit | null | undefined;
  }

  return JSON.stringify(body);
}

function isJsonBody(body: unknown): body is Record<string, unknown> {
  return (
    typeof body === "object" &&
    body !== null &&
    !(body instanceof FormData) &&
    !(body instanceof URLSearchParams) &&
    !(body instanceof Blob) &&
    !(body instanceof ArrayBuffer) &&
    !(body instanceof ReadableStream)
  );
}

async function readJson(response: Response): Promise<ApiResult<unknown>> {
  try {
    return {
      ok: true,
      status: response.status,
      data: await response.json(),
    };
  } catch (error) {
    return {
      ok: false,
      status: response.status,
      code: "invalid_json",
      message: "API response was not valid JSON.",
      cause: error,
    };
  }
}

function normalizeEnvelope<T>(value: unknown): ApiEnvelope<T> {
  if (typeof value === "object" && value !== null && "data" in value) {
    return value as ApiEnvelope<T>;
  }

  return { data: value as T };
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}
