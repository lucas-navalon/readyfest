import { formatDate } from '../utils/formatDate';

export default function UserTable({ loading, users, onDelete, onEdit }) {
  return (
    <section className="card table-card">
      <div className="card-header">
        <h2>Usuarios cadastrados</h2>
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
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{formatDate(user.created_at)}</td>
                  <td className="actions">
                    <button className="ghost-button" type="button" onClick={() => onEdit(user)}>
                      Editar
                    </button>
                    <button
                      className="danger-button"
                      type="button"
                      onClick={() => onDelete(user.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
