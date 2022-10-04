type ApiFailResponse = {
  message: string;
  code: string;
};

type ApiResponse<T> = T | ApiFailResponse;
