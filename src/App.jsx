import { useState, useEffect, useCallback, useRef } from 'react';
import { getLinks, createLink, deleteLink } from './api.js';
import BottomBar from './components/BottomBar.jsx';
import Starfield from './components/Starfield.jsx';
import LinkForm from './components/LinkForm.jsx';
import LinkTable from './components/LinkTable.jsx';
import QRModal from './components/QRModal.jsx';
import Toast from './components/Toast.jsx';
import './App.css';

export default function App() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [qrCode, setQrCode] = useState(null);
  const inputRef = useRef(null);

  const showToast = useCallback((message, type) => {
    setToast({ message, type });
  }, []);

  const fetchLinks = useCallback(async () => {
    try {
      const data = await getLinks();
      setLinks(data);
    } catch {
      showToast('could not reach the api. is the backend running?', 'error');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  const handleCreate = useCallback(
    async (url) => {
      try {
        const newLink = await createLink(url);
        setLinks((prev) => [newLink, ...prev]);
        showToast(`created: ${newLink.name}`, 'success');
        return true;
      } catch (err) {
        showToast(err.message, 'error');
        return false;
      }
    },
    [showToast]
  );

  const handleDelete = useCallback(
    async (name) => {
      try {
        await deleteLink(name);
        setLinks((prev) => prev.filter((l) => l.name !== name));
        showToast(`deleted: ${name}`, 'success');
      } catch (err) {
        showToast(err.message, 'error');
      }
    },
    [showToast]
  );

  const handleShortenClick = () => {
    inputRef.current?.focus();
  };

  return (
    <div className="app">
      <Starfield />
      <main className="main-content">
        <div className="hero">
          <LinkForm onSubmit={handleCreate} inputRef={inputRef} />
          <LinkTable
            links={links}
            loading={loading}
            onDelete={handleDelete}
            onShowQR={setQrCode}
          />
        </div>
      </main>

      <BottomBar onShortenClick={handleShortenClick} />

      {qrCode && (
        <QRModal code={qrCode} onClose={() => setQrCode(null)} />
      )}

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}
    </div>
  );
}
