export type ErrorResponseDto = {
    readonly type: string;
    readonly title: string;
    readonly status: number;
    readonly detail: string;
    readonly instance: string;
  };