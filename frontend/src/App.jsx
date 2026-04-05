import { useEffect, useState } from 'react';
import FeedbackMessage from './components/FeedbackMessage';
import UserForm from './components/UserForm';
import UserSearch from './components/UserSearch';
import UserTable from './components/UserTable';
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from './services/usersApi';

const initialForm = {
  name: '',
  email: '',
};

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const isEditing = editingId !== null;

  async function loadUsers() {
    try {
      setLoading(true);
      const data = await listUsers();
      setUsers(data);
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function handleFormChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function resetForm() {
    setForm(initialForm);
    setEditingId(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setSubmitting(true);
      setFeedback({ type: '', text: '' });

      if (isEditing) {
        await updateUser(editingId, form);
        setFeedback({ type: 'success', text: 'Usuario atualizado com sucesso.' });
      } else {
        await createUser(form);
        setFeedback({ type: 'success', text: 'Usuario criado com sucesso.' });
      }

      resetForm();
      setSelectedUser(null);
      await loadUsers();
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(user) {
    setEditingId(user.id);
    setForm({
      name: user.name,
      email: user.email,
    });
    setFeedback({ type: '', text: '' });
  }

  async function handleDelete(userId) {
    const confirmed = window.confirm('Deseja realmente remover este usuario?');

    if (!confirmed) {
      return;
    }

    try {
      setFeedback({ type: '', text: '' });
      await deleteUser(userId);
      setFeedback({ type: 'success', text: 'Usuario removido com sucesso.' });

      if (editingId === userId) {
        resetForm();
      }

      if (selectedUser?.id === userId) {
        setSelectedUser(null);
      }

      await loadUsers();
    } catch (error) {
      setFeedback({ type: 'error', text: error.message });
    }
  }

  async function handleSearch(searchId) {
    if (!searchId.trim()) {
      setSelectedUser(null);
      setFeedback({ type: 'error', text: 'Informe um ID para buscar.' });
      return;
    }

    try {
      setFeedback({ type: '', text: '' });
      const data = await getUserById(searchId.trim());
      setSelectedUser(data);
    } catch (error) {
      setSelectedUser(null);
      setFeedback({ type: 'error', text: error.message });
    }
  }

  return (
    <main className="page">
      <section className="hero card">
        <div className="hero-content">
          <p className="eyebrow">ReadyFest</p>
          <h1>Exemplo visual de CRUD de usuarios</h1>
          <p className="subtitle">
            Esta tela conversa com o backend e mostra, de forma simples, as 4 operacoes
            principais: criar, listar, atualizar e excluir.
          </p>
        </div>

        <div className="hero-actions">
          <div className="status-chip">
            <strong>{users.length}</strong>
            <span>{users.length === 1 ? 'usuario salvo' : 'usuarios salvos'}</span>
          </div>

          <button className="secondary-button" type="button" onClick={loadUsers}>
            Recarregar dados
          </button>
        </div>
      </section>

      <FeedbackMessage feedback={feedback} />

      <section className="steps">
        <article className="step-card">
          <span className="step-number">1</span>
          <h2>Preencha o formulario</h2>
          <p>Digite nome e email para criar um novo usuario no banco.</p>
        </article>

        <article className="step-card">
          <span className="step-number">2</span>
          <h2>Edite quando quiser</h2>
          <p>Clique em editar na tabela para carregar os dados no formulario.</p>
        </article>

        <article className="step-card">
          <span className="step-number">3</span>
          <h2>Busque por ID</h2>
          <p>Use a busca para mostrar rapidamente um registro especifico.</p>
          <p>mostre um registro especifico</p>
        </article>
      </section>

      <section className="grid">
        <UserForm
          form={form}
          isEditing={isEditing}
          submitting={submitting}
          onChange={handleFormChange}
          onReset={resetForm}
          onSubmit={handleSubmit}
        />

        <UserSearch selectedUser={selectedUser} onSearch={handleSearch} />
      </section>

      <UserTable
        editingId={editingId}
        loading={loading}
        users={users}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}
