class User {
  username;
  password;
  email;
  address;
  isAdmin;
  gender;


  constructor(username, password, email, address, isAdmin, gender) {
    this.username = username;
    this.password = password;
    this.email = email;
    this.address = address;
    this.isAdmin = isAdmin;
    this.gender = gender;
  }
}