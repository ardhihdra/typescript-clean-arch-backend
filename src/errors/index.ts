interface ServiceErrorType {

}

class ServiceError implements ServiceErrorType {
  message: String

  constructor(message: String) {
    this.message = message
  }
}

export {
  ServiceError,
  ServiceErrorType
}