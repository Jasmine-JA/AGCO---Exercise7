import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const storedUsers = localStorage.getItem('brewedway_users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    const loggedInUser = localStorage.getItem('brewedway_current_user');
    if (loggedInUser) {
      setCurrentUser(JSON.parse(loggedInUser));
      setCurrentPage('dashboard');
    }
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem('brewedway_users', JSON.stringify(users));
    }
  }, [users]);

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3,}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  const validateName = (name) => {
    return name.trim().length >= 2;
  };

  const validateRegistration = () => {
    const newErrors = {};

    if (!registerForm.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (!validateName(registerForm.name)) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!registerForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(registerForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    } else if (users.some(user => user.email.toLowerCase() === registerForm.email.toLowerCase())) {
      newErrors.email = 'This email is already registered';
    }

    if (!registerForm.password) {
      newErrors.password = 'Password is required';
    } else if (!validatePassword(registerForm.password)) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateLogin = () => {
    const newErrors = {};

    if (!loginForm.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(loginForm.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (!validateRegistration()) {
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      name: registerForm.name.trim(),
      email: registerForm.email.toLowerCase().trim(),
      password: registerForm.password,
      createdAt: new Date().toISOString(),
      isVerified: false
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);

    alert(`Account created successfully! Welcome, ${newUser.name}!`);

    setRegisterForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    });

    setErrors({});

    setCurrentPage('login');
  };

  const handleLogin = () => {
    if (!validateLogin()) {
      return;
    }

    const userExists = users.find(
      u => u.email.toLowerCase() === loginForm.email.toLowerCase().trim()
    );

    if (!userExists) {
      setErrors({
        email: 'The email you entered is not registered',
        password: ''
      });
      return;
    }

    if (userExists.password !== loginForm.password) {
      setErrors({
        email: '',
        password: 'Incorrect password'
      });
      return;
    }

    setCurrentUser(userExists);
    localStorage.setItem('brewedway_current_user', JSON.stringify(userExists));

    setLoginForm({
      email: '',
      password: ''
    });

    setErrors({});

    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('brewedway_current_user');
    setCurrentPage('login');
    setLoginForm({
      email: '',
      password: ''
    });
  };

  return (
    <div className="App">
      {currentPage === 'login' && (
        <Login
          loginForm={loginForm}
          setLoginForm={setLoginForm}
          errors={errors}
          handleLogin={handleLogin}
          setCurrentPage={setCurrentPage}
          setErrors={setErrors}
        />
      )}

      {currentPage === 'register' && (
        <Register
          registerForm={registerForm}
          setRegisterForm={setRegisterForm}
          errors={errors}
          handleRegister={handleRegister}
          setCurrentPage={setCurrentPage}
          setErrors={setErrors}
        />
      )}

      {currentPage === 'dashboard' && currentUser && (
        <Dashboard
          user={currentUser}
          handleLogout={handleLogout}
        />
      )}
    </div>
  );
}

export default App;