interface PageReq {
  search: string;
  page: string;
}

interface PageRes<T> {
  items: T[];
  page: { total_page: number; current_page: number; next_page: number };
}

interface ServerResponse<T> {
  ok: number;
  msg?: string;
  data?: T;
}

interface FetchState {
  isLoading: boolean;
  isError: boolean;
  error: string;
}

declare namespace NodeJS {
  interface ProcessEnv {
    API_BASE_URL: string;
  }
}
