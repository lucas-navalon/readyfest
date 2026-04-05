export default function UserForm({
  form,
  isEditing,
  submitting,
  onChange,
  onReset,
  onSubmit,
}) {
  return (
    <article className="card">
      <div className="card-header">
        <h2>{isEditing ? 'Editar usuario' : 'Novo usuario'}</h2>
        {isEditing ? (
          <button className="ghost-button" type="button" onClick={onReset}>
            Cancelar edicao
          </button>
        ) : null}
      </div>

      <form className="form" onSubmit={onSubmit}>
        <label>
          Nome
          <input
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Digite o nome"
            required
          />
        </label>

        <label>
          Email
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={onChange}
            placeholder="Digite o email"
            required
          />
        </label>

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting ? 'Salvando...' : isEditing ? 'Salvar alteracoes' : 'Criar usuario'}
        </button>
      </form>
    </article>
  );
}
