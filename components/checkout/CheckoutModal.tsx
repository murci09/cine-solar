"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CreditCard, ShieldCheck, Ticket, QrCode, CheckCircle2 } from "lucide-react";

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  movieTitle: string;
  showtime: string;
  seatsCount: number;
  totalPrice: number;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  movieTitle,
  showtime,
  seatsCount,
  totalPrice,
}: CheckoutProps) {
  const [loading, setLoading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePayWithMercadoPago = async () => {
    setLoading(true);

    // Simulación de procesamiento con la API de Mercado Pago
    setTimeout(() => {
      setLoading(false);
      setIsCompleted(true);
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg bg-[#0D0E15] border border-white/10 rounded-3xl p-6 md:p-8 text-white shadow-2xl overflow-hidden"
        >
          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!isCompleted ? (
            <>
              {/* Encabezado */}
              <div className="mb-6">
                <span className="text-xs font-bold text-[#FFC857] uppercase tracking-widest flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> Pago Seguro
                </span>
                <h3 className="text-2xl font-black mt-1">Resumen de Compra</h3>
              </div>

              {/* Detalle de la Orden */}
              <div className="space-y-4 bg-white/5 p-5 rounded-2xl border border-white/5 mb-6 text-sm">
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Película</span>
                  <span className="font-bold text-white">{movieTitle}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Función</span>
                  <span className="text-gray-200">{showtime}</span>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-white/10">
                  <span className="text-gray-400">Entradas</span>
                  <span className="text-gray-200">{seatsCount} persona(s)</span>
                </div>
                <div className="flex justify-between items-center pt-1">
                  <span className="text-base font-bold text-gray-300">Total</span>
                  <span className="text-2xl font-black text-[#FFC857]">
                    ${totalPrice.toLocaleString("es-AR")}
                  </span>
                </div>
              </div>

              {/* Botón Mercado Pago */}
              <button
                onClick={handlePayWithMercadoPago}
                disabled={loading}
                className="w-full py-4 bg-[#009EE3] hover:bg-[#0081B8] text-white font-black text-sm uppercase tracking-wider rounded-2xl shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <CreditCard className="w-5 h-5" />
                    Pagar con Mercado Pago
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-gray-500 mt-4">
                Procesado mediante Checkout Oficial de Mercado Pago Argentina.
              </p>
            </>
          ) : (
            /* Vista de Éxito con QR de Ingreso */
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-[#00F0FF]/20 border border-[#00F0FF] text-[#00F0FF] rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-white mb-1">¡Compra Confirmada!</h3>
              <p className="text-xs text-gray-400 mb-6">
                Presentá este código QR en el acceso al cine para ingresar.
              </p>

              {/* Simulación de QR */}
              <div className="bg-white p-4 rounded-2xl inline-block mb-6 border-4 border-[#FFC857]">
                <QrCode className="w-36 h-36 text-black" />
              </div>

              <div className="text-xs text-gray-400 mb-6 bg-white/5 p-3 rounded-xl">
                <span>Orden: <strong>#SOLAR-{Math.floor(100000 + Math.random() * 900000)}</strong></span>
              </div>

              <button
                onClick={onClose}
                className="w-full py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Volver al Inicio
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}