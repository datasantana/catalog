const { faker } = require('@faker-js/faker');

class usersService {
  constructor() {
    this.users = [];
    this.generate();
  }
  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.users.push({
        "userId": i,
        "name": faker.person.fullName(),
        "email": faker.internet.email(),
        "password": faker.internet.password(),
        "role": faker.person.jobType(),
        "image": faker.image.avatar(),
        "url": `http://localhost:3000/users/${i}`,
      });
    }
  }

  create(data) {
    const newUser = {
      "userId": this.users.length + 1,
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  find() {
    return this.users;
  }

  findById(userId) {
    return this.users.find((user) => user.userId === parseInt(userId, 10));
  }

  update(userId, data) {
    const userIndex = this.users.findIndex((user) => user.userId === parseInt(userId, 10));
    if (userIndex === -1) {
      throw new Error('User not found');
    } else {
      this.users[userIndex] = {
        ...this.users[userIndex],
        ...data,
      };
      return this.users[userIndex];
    }
  }

  delete(userId) {
    const userIndex = this.users.findIndex((user) => user.userId === parseInt(userId, 10));
    if (userIndex === -1) {
      throw new Error('User not found');
    } else {
      this.users.splice(userIndex, 1);
      return {
        message: 'User deleted',
      };
    }
  }
}

module.exports = usersService;
