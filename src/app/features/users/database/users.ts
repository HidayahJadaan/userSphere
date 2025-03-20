import User from '../models/user.model';

export const users: User[] = [
  {
    id: 'usr-1',
    name: 'Hidayah Jadaan',
    email: 'hidayah@gmail.com',
    password: '123456',
    role: 'Frontend Dev',
    created_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-2',
    name: 'Hala Omar',
    email: 'hala@gmail.com',
    password: '2458773',
    role: 'Backend Dev',

    created_at: new Date('2025-03-14'),
  },
  {
    id: 'usr-3',
    name: 'Heba Ibrahim',
    email: 'heba@gmail.com',
    password: '768543123',
    role: 'Full Stack Dev',

    created_at: new Date('2025-03-14'),
  },
];
export const getUsers = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(users);
    }, 3000);
  });
}

export const addUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if the email already exists
      const existingUser = users.find((u: User) => u.email === user.email);
      if (existingUser) {
        return reject('User with this email already exists');
      }

      user.id = 'usr-' + (users.length + 1);
      user.created_at = new Date();
      users.push(user);
      resolve(user);
    }, 3000);
  });
};


export const getUser = (id: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user: User) => user.id === id);
      if (user) {
        resolve(user);
      } else {
        reject("User Does'nt Exists");
      }
    }, 1000);
  });
}


export const editUser = (userUpdated: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let userID = users.findIndex((user: User) => user.id === userUpdated.id);
      if (userID != -1) {
        const user = users[userID]= {...userUpdated};
  
        user.updated_at = new Date();
        // this.users;
        resolve(user);
      } else {
        reject("User Does'nt Exists");
      }
    }, 1000);
  });
}


export const loginUser = (email: string, password:string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = users.find((user: User) => user.email === email && user.password === password);
      if (user) {
        resolve(user);
      } else {
        reject("Incorrect Email Or Password");
      }
    }, 1000);
  });
};

export const registerUser = (user: User): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const existingUser = users.find((u: User) => u.email === user.email);
      if (existingUser) {
        return reject('Email already in use');
      }

      user.id = 'usr-' + (users.length + 1);
      user.created_at = new Date();

      users.push(user);
      resolve(user);
    }, 2000);
  });
};
