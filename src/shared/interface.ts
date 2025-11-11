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

export interface UseToastClickAwayOptions {
  enabled?: boolean;
  delay?: number;
  onDismiss?: () => void;
}

export interface LoadingBackdropProps {
  open: boolean;
  blur?: boolean;
}
