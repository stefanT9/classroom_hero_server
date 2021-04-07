export class UserNotFound extends Error {
  constructor() {
    super();
    this.message = "User not found";
  }
}
export class InvalidEmailPasswordCombo extends Error {
  constructor() {
    super();
    this.message = "Invalid email password combo";
  }
}
export class EmailInUse extends Error {
  constructor() {
    super();
    this.message = "Email already in use";
  }
}

export class TokenNotAvailable extends Error {
  constructor() {
    super();
    this.message = "Token not present in header.authorization";
  }
}

export class InvalidToken extends Error {
  constructor() {
    super();
    this.message = "Token is invalid";
  }
}
