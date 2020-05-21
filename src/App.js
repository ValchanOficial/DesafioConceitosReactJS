import React, { useState, useEffect } from "react";
import Api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await Api.get('/repositories');
      await setRepositories(res.data);
    }
    fetchData();
  },[])

  async function handleAddRepository() {
    const res = await Api.post(`/repositories`, {
      title: `Desafio ReactJS ${new Date().toLocaleString()}`,
      url: 'https://github.com/ValchanOficial/DesafioConceitosReactJS', 
      techs: ['NodeJS', 'ReactJS', 'Jest']
    });
    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    await Api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
