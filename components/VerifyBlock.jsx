"use client";

import {
  MiniKit,
  VerificationLevel,
} from "@worldcoin/minikit-js";
import { useCallback, useState } from "react";
import { useRouter } from "next/router";

const verifyPayload = {
  action: "vota-por-proyecto",
  signal: "",
  app_id: "app_439de68878943e5da3db6dc84b7d46d2", // 🔥 importante
  verification_level: VerificationLevel.Orb,
};

export function VerifyBlock() {
  const [status, setStatus] = useState("Esperando verificación...");
  const router = useRouter();

  const handleVerify = useCallback(async () => {
    if (!MiniKit.isInstalled()) {
      setStatus("❌ Abre esta MiniApp desde World App.");
      return;
    }

    try {
      const { finalPayload } = await MiniKit.commandsAsync.verify(verifyPayload);

      if (finalPayload.status === "error") {
        setStatus("❌ Verificación cancelada.");
        return;
      }

      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          payload: finalPayload,
          action: verifyPayload.action,
          signal: verifyPayload.signal,
        }),
      });

      const result = await res.json();

      if (res.status === 200 && result.success) {
        setStatus("✅ Verificación exitosa. Redirigiendo...");
        setTimeout(() => router.push("/blog"), 1500);
      } else if (result.verifyRes?.code === "already_verified") {
        setStatus("✅ Ya estabas verificado. Redirigiendo...");
        setTimeout(() => router.push("/blog"), 1500);
      } else {
        setStatus("❌ Falló verificación.");
      }

    } catch (err) {
      console.error("Error:", err);
      setStatus("❌ Error inesperado.");
    }
  }, [router]);

  return (
    <div className="text-center">
      <p className="mb-2">{status}</p>
      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Ingresar con World ID
      </button>
    </div>
  );
}
