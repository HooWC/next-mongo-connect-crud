import { dbConnect } from '../../config/dbConnect';
import User from '../../models/User';

// GET 请求：获取所有用户
export async function getUsers(req, res) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

// POST 请求：添加一个新用户
export async function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  try {
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
}

// DELETE 请求：删除用户
export async function deleteUser(req, res) {
  const { id } = req.query;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
}

// PUT 请求：更新用户
export async function updateUser(req, res) {
  const { id } = req.query;
  const { name, email } = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, email },
      { new: true } // 返回更新后的用户
    );
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    return getUsers(req, res);
  }

  if (req.method === 'POST') {
    return createUser(req, res);
  }

  if (req.method === 'DELETE') {
    return deleteUser(req, res);
  }

  if (req.method === 'PUT') {
    return updateUser(req, res);
  }

  res.status(405).json({ error: 'Method not allowed' });
}
