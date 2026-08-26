import { mockUsers } from "../data/mockUsers";
import { mockApiCall } from "./mockApiClient";

const AUTH_KEY = "sspt_auth_user";
const REGISTERED_KEY = "sspt_registered_users";

function getRegisteredUsers() {
  const raw = localStorage.getItem(REGISTERED_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveRegisteredUsers(users) {
  localStorage.setItem(REGISTERED_KEY, JSON.stringify(users));
}

// Combines the seeded mockUsers with anyone who registered during this browser session
function getAllUsers() {
  return [...mockUsers, ...getRegisteredUsers()];
}

export async function loginUser(email, password) {
  await mockApiCall(null, 600);
  const found = getAllUsers().find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!found) throw new Error("Invalid email or password.");

  const { password: _pw, ...safeUser } = found; // never store the password in localStorage
  localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export async function registerStudent(formData) {
  await mockApiCall(null, 600);
  const emailExists = getAllUsers().some(
    (u) => u.email.toLowerCase() === formData.email.toLowerCase()
  );
  if (emailExists) throw new Error("An account with this email already exists.");

  const newUser = {
    id: `STU${Date.now().toString().slice(-6)}`, // simple unique-enough mock ID
    name: formData.name,
    email: formData.email,
    password: formData.password,
    phone: formData.phone,
    role: "student",
  };

  const registered = getRegisteredUsers();
  registered.push(newUser);
  saveRegisteredUsers(registered);

  const { password: _pw, ...safeUser } = newUser;
  localStorage.setItem(AUTH_KEY, JSON.stringify(safeUser));
  return safeUser;
}

export function getStoredUser() {
  const raw = localStorage.getItem(AUTH_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function logoutUser() {
  localStorage.removeItem(AUTH_KEY);
}