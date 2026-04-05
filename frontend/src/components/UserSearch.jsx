import { useState } from 'react';
import { formatDate } from '../utils/formatDate';

export default function UserSearch({ selectedUser, onSearch }) {
  const [searchId, setSearchId] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    await onSearch(searchId);
  }

  return (
    <article className="card">
      <div className="card-header">
        <h2>Buscar por ID</h2>
      </div>

      <form className="search-form" onSubmit={handleSubmit}>
        <input
          value={searchId}
          onChange={(event) => setSearchId(event.target.value)}
          placeholder="Ex.: 1"
          inputMode="numeric"
        />
        <button className="secondary-button" type="submit">
          Buscar
        </button>
      </form>

      <div className="result-box">
        {selectedUser ? (
          <>
            <strong>{selectedUser.name}</strong>
            <span>{selectedUser.email}</span>
            <small>Criado em: {formatDate(selectedUser.created_at)}</small>
            <small>Atualizado em: {formatDate(selectedUser.updated_at)}</small>
          </>
        ) : (
          <span>Nenhum usuario selecionado.</span>
        )}
      </div>
    </article>
  );
}
