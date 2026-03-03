import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // ================= REGISTER =================
  register(user: any) {

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const existingUser = users.find(
      (u: any) => u.email === user.email
    );

    if (existingUser) {
      return { success: false, message: 'Email already exists' };
    }

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
      return true;
    }

    return false;
  }

  // ================= LOGOUT =================
  logout() {
    localStorage.removeItem('loggedInUser');
  }

  // ================= CHECK LOGIN =================
  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  // ================= GET CURRENT USER =================
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('loggedInUser') || 'null');
  }

  // ================= UPDATE USER (NEW ADDED) =================
  updateUser(updatedUser: any) {

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const currentUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');

    if (!currentUser) {
      return { success: false, message: 'User not logged in' };
    }

    const index = users.findIndex(
      (u: any) => u.email === currentUser.email
    );

    if (index === -1) {
      return { success: false, message: 'User not found' };
    }

    // 🔥 Prevent email duplication while editing
    const emailExists = users.find(
      (u: any) => u.email === updatedUser.email && u.email !== currentUser.email
    );

    if (emailExists) {
      return { success: false, message: 'Email already exists' };
    }

    // 🔥 If password field is empty → keep old password
    if (!updatedUser.password) {
      updatedUser.password = users[index].password;
    }

    // Update user
    users[index] = { ...users[index], ...updatedUser };

    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('loggedInUser', JSON.stringify(users[index]));

    return { success: true };
  }
}