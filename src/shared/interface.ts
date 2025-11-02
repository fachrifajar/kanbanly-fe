export interface ResponseAPI {
  status: string;
  message: string;
}

export interface ResponseAPIError {
  message: string;
  error: object;
  statusCode: number;
}

export interface PageSearchParams<
  T extends Record<string, string | undefined>
> {
  searchParams: T;
}
