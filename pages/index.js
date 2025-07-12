import dynamic from "next/dynamic";

// Importa dinámicamente el componente solo en cliente (evita error en build)
const VerifyBlock = dynamic(() => import("../components/VerifyBlock").then(mod => mod.VerifyBlock), {
  ssr: false, // Desactiva server-side rendering para este componente
});

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white shadow-md rounded">
        <h1 className="text-2xl font-bold mb-4">Mini App Finanzas</h1>
        <p className="mb-6">Presiona el botón para verificar tu identidad y acceder al blog.</p>
        <VerifyBlock />
      </div>
    </div>
  );
}
