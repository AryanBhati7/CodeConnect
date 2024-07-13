class ApiResponse {
  constructor(status, data, message) {
    this.success = status < 400;
    this.status = status;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };
