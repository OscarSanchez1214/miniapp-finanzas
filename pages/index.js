import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    setVerified(true);
    router.push('/blog');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Mini App Finanzas</h1>
        <p className="mb-6">Presiona el botón para acceder al blog de recomendaciones financieras.</p>
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}
