import './App.css';
import { useState } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      password
    }

    axios.post("http://localhost:3000/user/newsletter", data).then((response) => {
      console.log(response);
    }).catch((error) => {
      console.log(error);
    }).finally(() => {
      setName('');
      setEmail('');
      setPassword('');
    })
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Name:</label>
        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label htmlFor="">Email:</label>
        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <label htmlFor="">Password:</label>
        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type='submit'>Submit!</button>
      </form>
    </div>
  );
}

export default App;
