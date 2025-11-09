class User {
  constructor(email, password, fullname, street, postal, city) {
    this.email = email;
    this.password = password;
    this.address = {
      name: fullname,
      street: street,
      postalCode: postal,
      city: city,
    };
  }
}
