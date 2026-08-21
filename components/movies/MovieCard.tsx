"use client";

import React from "react";
import { motion } from "framer-motion";
import { Clock, Film } from "lucide-react";

export interface MovieProps {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  format: string[];
  posterUrl: string;
  showtimes?: string[];
}

export default function MovieCard({
  movie,
  onSelect,
}: {
  movie: MovieProps;
  onSelect: (movie: MovieProps) => void;
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -6 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      onClick={() => onSelect(movie)}
      className="group relative bg-[#0D0E15] border border-white/10 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
    >
      {/* Contenedor del Póster */}
      <div className="relative h-[380px] w-full overflow-hidden">
        <img
          src={movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0E15] via-transparent to-transparent opacity-90" />
        
        {/* Badges de Formato */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {movie.format.map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 text-[10px] font-bold tracking-wider text-black bg-[#FFC857] rounded-md shadow-lg"
            >
              {fmt}
            </span>
          ))}
        </div>

        {/* Clasificación */}
        <div className="absolute top-3 right-3 px-2 py-0.5 text-[10px] font-bold text-white bg-black/60 border border-white/20 backdrop-blur-md rounded-md">
          {movie.rating}
        </div>
      </div>

      {/* Información de la Película */}
      <div className="p-5 flex flex-col justify-between h-[160px]">
        <div>
          <span className="text-xs font-semibold text-[#00F0FF] uppercase tracking-wider">
            {movie.genre}
          </span>
          <h3 className="text-xl font-bold text-white mt-1 group-hover:text-[#FFC857] transition-colors line-clamp-1">
            {movie.title}
          </h3>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 border-t border-white/10 pt-3">
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-[#FFC857]" />
            <span>{movie.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Film className="w-3.5 h-3.5 text-[#00F0FF]" />
            <span>Seleccionar Función</span>
          </div>
        </div>

        {/* Botón de Acción */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(movie);
          }}
          className="w-full mt-2 py-2 bg-gradient-to-r from-[#FFC857] to-[#FF9900] text-black font-bold text-xs uppercase tracking-wider rounded-xl opacity-90 group-hover:opacity-100 transition-all shadow-lg"
        >
          Elegir Horarios
        </button>
      </div>
    </motion.div>
  );
}