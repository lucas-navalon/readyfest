import { formatDate } from '../utils/formatDate';

export default function UserTable({ editingId, loading, users, onDelete, onEdit }) {
  return (
    <section className="card table-card">
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
