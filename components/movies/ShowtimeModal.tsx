"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Calendar, Film } from "lucide-react";
import { MovieProps } from "./MovieCard";

interface ShowtimeModalProps {
  movie: MovieProps | null;
  onClose: () => void;
  onSelectShowtime: (movie: MovieProps, showtime: string) => void;
}

export default function ShowtimeModal({
  movie,
  onClose,
  onSelectShowtime,
}: ShowtimeModalProps) {
  if (!movie) return null;

  const showtimes = movie.showtimes || ["16:30 Hs", "19:00 Hs", "21:30 Hs", "23:45 Hs"];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-xl bg-[#0D0E15] border border-white/10 rounded-3xl p-6 md:p-8 text-white shadow-2xl overflow-hidden"
        >
          {/* Botón Cerrar */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-gray-400 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Encabezado con Poster de la Película */}
          <div className="flex gap-4 items-center mb-6">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-20 h-28 object-cover rounded-xl border border-white/10 shadow-md"
            />
            <div>
              <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest">
                {movie.genre}
              </span>
              <h3 className="text-2xl font-black text-white mt-0.5">{movie.title}</h3>
              <p className="text-xs text-gray-400 mt-1">Duración: {movie.duration} | {movie.rating}</p>
            </div>
          </div>

          <hr className="border-white/10 mb-6" />

          <h4 className="text-sm font-bold text-[#FFC857] uppercase tracking-wider mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4" /> Seleccioná el Horario de la Función
          </h4>

          {/* Botones de Horarios */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {showtimes.map((time) => (
              <button
                key={time}
                onClick={() => onSelectShowtime(movie, time)}
                className="py-3 px-4 bg-white/5 hover:bg-[#FFC857] hover:text-black font-extrabold text-sm rounded-xl border border-white/10 hover:border-[#FFC857] transition-all shadow-md text-center"
              >
                {time}
              </button>
            ))}
          </div>

          <p className="text-[11px] text-gray-500 text-center">
            Sala 1 IMAX - Proyección Láser 4K & Sonido Dolby Atmos
          </p>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}