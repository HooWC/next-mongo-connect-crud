import { useState, useEffect } from 'react';

const API_URL = '/api/users'; // API 路径

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  // 获取用户列表
  const fetchUsers = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  // 添加用户
  const addUser = async (user) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        fetchUsers(); // 刷新用户列表
      } else {
        console.error('Failed to add user');
      }
    } catch (err) {
      console.error('Error adding user:', err);
    }
  };

  // 删除用户
  const deleteUser = async (id) => {
    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchUsers(); // 刷新用户列表
      } else {
        console.error('Failed to delete user');
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // 更新用户
  const updateUser = async (id, updatedUser) => {
    try {
      const res = await fetch(`${API_URL}?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedUser),
      });

      if (res.ok) {
        fetchUsers(); // 刷新用户列表
      } else {
        console.error('Failed to update user');
      }
    } catch (err) {
      console.error('Error updating user:', err);
    }
  };

  useEffect(() => {
    fetchUsers(); // 组件挂载时获取用户列表
  }, []);

  return { users, addUser, deleteUser, updateUser };
};
