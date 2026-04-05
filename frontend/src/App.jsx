import { useEffect, useMemo, useState } from 'react';
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

  const isEditing = useMemo(() => editingId !== null, [editingId]);

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
      <section className="hero">
        <div>
          <p className="eyebrow">ReadyFest</p>
          <h1>Painel simples para consumir o CRUD de usuarios</h1>
          <p className="subtitle">
            Cadastre, edite, busque e remova usuarios usando os endpoints do backend.
          </p>
        </div>
        <button className="secondary-button" type="button" onClick={loadUsers}>
          Atualizar lista
        </button>
      </section>

      <FeedbackMessage feedback={feedback} />

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
        loading={loading}
        users={users}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </main>
  );
}
