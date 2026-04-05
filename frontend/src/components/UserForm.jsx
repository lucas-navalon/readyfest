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
        <div>
          <h2>{isEditing ? 'Editar usuario' : 'Criar usuario'}</h2>
          <p className="section-text">
            {isEditing
              ? 'Os campos abaixo foram preenchidos com os dados do usuario selecionado.'
              : 'Preencha os campos para enviar um novo usuario para o backend.'}
          </p>
        </div>
        {isEditing ? (
          <button className="ghost-button" type="button" onClick={onReset}>
            Voltar para criacao
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
          {submitting ? 'Salvando...' : isEditing ? 'Salvar alteracoes' : 'Cadastrar usuario'}
        </button>
      </form>
    </article>
  );
}
