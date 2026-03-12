import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(){

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const adminExists = users.find((u:any)=>u.email==="admin@gmail.com");

    if(!adminExists){

      users.push({
        name:"Admin",
        email:"admin@gmail.com",
        password:"admin123",
        role:"admin"
      });

      localStorage.setItem("users",JSON.stringify(users));
    }
  }

  // ================= REGISTER =================
  register(user: any) {

    if(!user.name || !user.email || !user.password){
      return { success: false, message: 'All fields required' };
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find(
      (u: any) => u.email === user.email
    );

    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

    // default role
    user.role = "user";

    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    return { success: true };
  }


  // ================= LOGIN =================
  login(email: string, password: string): boolean {

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (user) {

      localStorage.setItem('loggedInUser', JSON.stringify(user));
      localStorage.setItem("isLoggedIn","true");

      return true;
    }

    return false;
  }


  // ================= LOGOUT =================
  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('isLoggedIn');
  }


  // ================= CHECK LOGIN =================
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }


  // ================= GET CURRENT USER =================
  getCurrentUser() {

    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;

  }


  // ================= CHECK ADMIN =================
  isAdmin(): boolean {

    const user = this.getCurrentUser();

    return user && user.role === "admin";

  }


  // ================= UPDATE USER =================
  updateUser(updatedUser: any) {

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = this.getCurrentUser();

    if (!currentUser) {
      return { success: false, message: 'User not logged in' };
    }

    const index = users.findIndex(
      (u: any) => u.email === currentUser.email
    );

    if (index === -1) {
      return { success: false, message: 'User not found' };
    }

    const emailExists = users.find(
      (u: any) => u.email === updatedUser.email && u.email !== currentUser.email
    );

    if (emailExists) {
      return { success: false, message: 'Email already exists' };
    }

    if (!updatedUser.password) {
      updatedUser.password = users[index].password;
    }

    users[index] = { ...users[index], ...updatedUser };

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(users[index]));

    return { success: true };
  }

}