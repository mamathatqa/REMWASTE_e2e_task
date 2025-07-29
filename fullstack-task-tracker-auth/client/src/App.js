import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:4000';

function App() {
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('testuser');
  const [password, setPassword] = useState('password');
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState('');
  const [error, setError] = useState('');

  // Fetch tasks when token changes (login)
  useEffect(() => {
    if (!token) {
      setTasks([]);
      return;
    }
    axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setTasks(res.data))
      .catch(() => setError('Failed to fetch tasks'));
  }, [token]);

  const login = async () => {
    setError('');
    try {
      const res = await axios.post(`${API_URL}/login`, { username, password });
      setToken(res.data.token);
    } catch {
      setError('Login failed');
    }
  };

  const logout = () => {
    setToken('');
    setTasks([]);
  };

  const addTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const res = await axios.post(`${API_URL}/tasks`, { title: newTaskTitle }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(prev => [...prev, res.data]);
      setNewTaskTitle('');
    } catch {
      setError('Failed to add task');
    }
  };

  const startEdit = (task) => {
    setEditTaskId(task.id);
    setEditTaskTitle(task.title);
  };

  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskTitle('');
  };

  const saveEdit = async () => {
    if (!editTaskTitle.trim()) return;
    try {
      const res = await axios.put(`${API_URL}/tasks/${editTaskId}`, { title: editTaskTitle }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.map(t => (t.id === editTaskId ? res.data : t)));
      cancelEdit();
    } catch {
      setError('Failed to update task');
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(tasks.filter(t => t.id !== id));
    } catch {
      setError('Failed to delete task');
    }
  };

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" /><br /><br />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" /><br /><br />
        <button onClick={login}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Tracker</h2>
      <button onClick={logout}>Logout</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h3>Add New Task</h3>
      <input
        value={newTaskTitle}
        onChange={e => setNewTaskTitle(e.target.value)}
        placeholder="New task title"
      />
      <button onClick={addTask}>Add</button>

      <h3>Your Tasks</h3>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            {editTaskId === task.id ? (
              <>
                <input
                  value={editTaskTitle}
                  onChange={e => setEditTaskTitle(e.target.value)}
                />
                <button onClick={saveEdit}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                {task.title} &nbsp;
                <button onClick={() => startEdit(task)}>Edit</button>
                <button onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
