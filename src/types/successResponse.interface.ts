interface SuccessResponse<T> {
  message: string;
  data: T | T[] | any;
}

export default SuccessResponse;
