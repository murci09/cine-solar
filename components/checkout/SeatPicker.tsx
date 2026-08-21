"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Users, Info, Ticket } from "lucide-react";

export interface Seat {
  id: string;
  row: string;
  number: number;
  isOccupied: boolean;
}

const GENERATE_SEATS = (): Seat[] => {
  const rows = ["A", "B", "C", "D", "E"];
  const seats: Seat[] = [];

  rows.forEach((row) => {
    for (let num = 1; num <= 8; num++) {
      const isOccupied = (row === "B" && (num === 3 || num === 4)) || (row === "D" && num === 5);
      seats.push({
        id: `${row}-${num}`,
        row,
        number: num,
        isOccupied,
      });
    }
  });

  return seats;
};

export default function SeatPicker({
  movieTitle = "Película",
  showtime = "21:15 Hs - Sala 1",
  format = "2D",
  onConfirm,
}: {
  movieTitle?: string;
  showtime?: string;
  format?: string;
  onConfirm?: (selectedSeats: Seat[], total: number) => void;
}) {
  const [seats] = useState<Seat[]>(GENERATE_SEATS());
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);

  // Lógica de precio según formato
  const ticketPrice = format.includes("3D") ? 15000 : 14000;

  const toggleSeat = (seat: Seat) => {
    if (seat.isOccupied) return;

    if (selectedSeatIds.includes(seat.id)) {
      setSelectedSeatIds(selectedSeatIds.filter((id) => id !== seat.id));
    } else {
      setSelectedSeatIds([...selectedSeatIds, seat.id]);
    }
  };

  const selectedSeats = seats.filter((s) => selectedSeatIds.includes(s.id));
  const occupiedCount = seats.filter((s) => s.isOccupied).length;
  const totalCapacity = seats.length;
  const totalPrice = selectedSeats.length * ticketPrice;

  const rows = Array.from(new Set(seats.map((s) => s.row)));

  return (
    <div className="w-full max-w-5xl mx-auto p-6 md:p-10 bg-[#0D0E15]/90 border border-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl text-white">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-white/10 gap-4">
        <div>
          <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest flex items-center gap-1.5">
            <Ticket className="w-4 h-4" /> Selección de Entradas ({format})
          </span>
          <h2 className="text-2xl md:text-3xl font-black mt-1">{movieTitle}</h2>
          <p className="text-sm text-gray-400">{showtime}</p>
        </div>

        <div className="text-left md:text-right">
          <span className="text-xs text-gray-400 block">Total ({selectedSeats.length} entradas)</span>
          <span className="text-3xl font-black text-[#FFC857]">
            ${totalPrice.toLocaleString("es-AR")}
          </span>
        </div>
      </div>

      {/* Nota aclaratoria para Tucumán */}
      <div className="mt-6 p-4 bg-[#00F0FF]/10 border border-[#00F0FF]/20 rounded-2xl flex items-center gap-3 text-xs text-[#00F0FF]">
        <Info className="w-5 h-5 shrink-0" />
        <span>
          <strong>Ubicación libre por orden de llegada:</strong> La selección de ubicaciones ayuda a controlar la capacidad de la sala en tiempo real.
        </span>
      </div>

      {/* Pantalla Curva */}
      <div className="my-8 flex flex-col items-center">
        <div className="w-3/4 h-2 bg-gradient-to-r from-transparent via-[#00F0FF] to-transparent rounded-full shadow-[0_0_25px_#00F0FF]" />
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 mt-3 font-semibold">
          Pantalla Cines del Solar
        </span>
      </div>

      {/* Grid de Asientos */}
      <div className="flex flex-col items-center gap-3 my-6 overflow-x-auto py-2">
        {rows.map((row) => (
          <div key={row} className="flex items-center gap-2 md:gap-3">
            <span className="w-6 text-xs text-center text-gray-500 font-bold">{row}</span>
            <div className="flex gap-2">
              {seats
                .filter((s) => s.row === row)
                .map((seat) => {
                  const isSelected = selectedSeatIds.includes(seat.id);

                  let bgStyle = "bg-white/10 text-gray-300 hover:bg-white/20 border-white/5";
                  if (seat.isOccupied) bgStyle = "bg-red-500/10 text-red-500/40 border-red-500/20 cursor-not-allowed";
                  else if (isSelected) bgStyle = "bg-[#FFC857] text-black font-extrabold border-[#FFC857] shadow-[0_0_15px_#FFC857]";

                  return (
                    <motion.button
                      key={seat.id}
                      whileHover={{ scale: seat.isOccupied ? 1 : 1.15 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => toggleSeat(seat)}
                      disabled={seat.isOccupied}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-xl border flex items-center justify-center text-xs font-semibold transition-all ${bgStyle}`}
                    >
                      {seat.number}
                    </motion.button>
                  );
                })}
            </div>
            <span className="w-6 text-xs text-center text-gray-500 font-bold">{row}</span>
          </div>
        ))}
      </div>

      {/* Referencias */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-t border-b border-white/10 text-xs text-gray-400">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-white/10 border border-white/10" />
            <span>Entrada (${ticketPrice.toLocaleString("es-AR")})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-[#FFC857]" />
            <span>Tu selección</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-md bg-red-500/10 border border-red-500/20" />
            <span>Ocupado</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-300 font-medium">
          <Users className="w-4 h-4 text-[#00F0FF]" />
          <span>Ocupación: {occupiedCount + selectedSeats.length} / {totalCapacity}</span>
        </div>
      </div>

      {/* Acciones */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-gray-400">
          {selectedSeats.length > 0 ? (
            <span>
              Lugar(es) reservado(s): <strong className="text-white">{selectedSeats.length} persona(s)</strong>
            </span>
          ) : (
            <span>Seleccioná la cantidad de entradas para continuar.</span>
          )}
        </div>

        <button
          disabled={selectedSeats.length === 0}
          onClick={() => onConfirm && onConfirm(selectedSeats, totalPrice)}
          className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg ${
            selectedSeats.length > 0
              ? "bg-gradient-to-r from-[#FFC857] to-[#FF9900] text-black hover:opacity-90 cursor-pointer"
              : "bg-white/10 text-gray-500 cursor-not-allowed"
          }`}
        >
          Ir a Pagar (${totalPrice.toLocaleString("es-AR")})
        </button>
      </div>
    </div>
  );
}