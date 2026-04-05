import { formatDate } from '../utils/formatDate';

export default function UserTable({ editingId, loading, users, onDelete, onEdit }) {
  return (
    <section className="card table-card">
      <div className="card-header">
        <div>
          <h2>Lista de usuarios</h2>
          <p className="section-text">
            A tabela abaixo mostra os dados retornados pelo endpoint de listagem.
          </p>
        </div>
        <span className="badge">{users.length} registros</span>
      </div>

      {loading ? (
        <p>Carregando usuarios...</p>
      ) : users.length === 0 ? (
        <p>Nenhum usuario cadastrado ainda.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Criado em</th>
                <th>Acoes</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
