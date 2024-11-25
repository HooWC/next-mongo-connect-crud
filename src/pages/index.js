import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';

export default function Home() {
  const { users, addUser, deleteUser, updateUser } = useUsers();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [editingUser, setEditingUser] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingUser) {
      // 更新用户
      updateUser(editingUser._id, { name, email });
      setEditingUser(null);
    } else {
      // 添加用户
      addUser({ name, email });
    }

    setName('');
    setEmail('');
  };

  const handleEdit = (user) => {
    setName(user.name);
    setEmail(user.email);
    setEditingUser(user);
  };

  return (
    <div>
      <h1>Users</h1>

      {/* 用户表单 */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
      </form>

      {/* 用户列表 */}
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => deleteUser(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
