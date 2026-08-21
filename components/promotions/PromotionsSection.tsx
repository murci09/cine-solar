"use client";

import React from "react";
import { Popcorn } from "lucide-react";

export default function PromotionsSection() {
  return (
    <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto border-t border-white/10">
      <div className="mb-8">
        <span className="text-xs font-bold text-[#00F0FF] uppercase tracking-widest">
          Beneficios Exclusivos
        </span>
        <h2 className="text-3xl font-black text-white mt-1">Promociones Cines del Solar</h2>
        <p className="text-sm text-gray-400">Válidas para tus funciones en todas las salas.</p>
      </div>

      {/* Combos de Candy Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {/* Combo 1 */}
        <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-black shadow-xl flex justify-between items-center">
          <div>
            <span className="text-xs font-black uppercase bg-black/20 px-2.5 py-1 rounded-md text-white">
              Combo 1
            </span>
            <h3 className="text-xl font-black mt-3">POCHOCLO CHICO</h3>
            <p className="text-xs font-bold text-black/80 mt-1">+ 1 BEBIDA</p>
          </div>
          <Popcorn className="w-16 h-16 opacity-80 shrink-0" />
        </div>

        {/* Combo 2 */}
        <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-6 text-white shadow-xl flex justify-between items-center">
          <div>
            <span className="text-xs font-black uppercase bg-black/20 px-2.5 py-1 rounded-md">
              Combo 2
            </span>
            <h3 className="text-xl font-black mt-3">POCHOCLO MEDIANO</h3>
            <p className="text-xs font-bold text-white/90 mt-1">+ 2 BEBIDAS</p>
          </div>
          <Popcorn className="w-16 h-16 opacity-80 shrink-0" />
        </div>

        {/* Combo 3 */}
        <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl flex justify-between items-center">
          <div>
            <span className="text-xs font-black uppercase bg-black/20 px-2.5 py-1 rounded-md">
              Combo 3
            </span>
            <h3 className="text-xl font-black mt-3">POCHOCLO HEXAGONAL</h3>
            <p className="text-xs font-bold text-white/90 mt-1">+ 2 BEBIDAS</p>
          </div>
          <Popcorn className="w-16 h-16 opacity-80 shrink-0" />
        </div>
      </div>

      {/* Descuentos y 2x1 con Logos Oficiales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Club La Gaceta */}
        <div className="bg-[#0D0E15] border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-[#FFC857]/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-24 h-12 flex items-center justify-center shrink-0">
              <img
                src="https://solardelcerro.com/wp-content/uploads/2024/12/promo-club_la_gaceta.png"
                alt="Club La Gaceta"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <span className="text-base font-black text-[#FFC857] bg-[#FFC857]/10 px-3 py-1.5 rounded-xl border border-[#FFC857]/20 shrink-0">
            2×1
          </span>
        </div>

        {/* Cines del Solar */}
        <div className="bg-[#0D0E15] border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-[#00F0FF]/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-24 h-12 flex items-center justify-center shrink-0">
              <img
                src="https://solardelcerro.com/wp-content/uploads/2024/12/logo-cines-338x161-1.svg"
                alt="Nuevos Cines del Solar"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <span className="text-base font-black text-[#00F0FF] bg-[#00F0FF]/10 px-3 py-1.5 rounded-xl border border-[#00F0FF]/20 shrink-0">
            2×1
          </span>
        </div>

        {/* Personal Pay */}
        <div className="bg-[#0D0E15] border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-[#FFC857]/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-24 h-12 flex items-center justify-center shrink-0">
              <img
                src="https://solardelcerro.com/wp-content/uploads/2026/04/PPAY-LOGO-300x94.png"
                alt="Personal Pay"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <span className="text-base font-black text-[#FFC857] bg-[#FFC857]/10 px-3 py-1.5 rounded-xl border border-[#FFC857]/20 shrink-0">
            2×1
          </span>
        </div>

        {/* Club Milenia */}
        <div className="bg-[#0D0E15] border border-white/10 p-5 rounded-2xl flex items-center justify-between hover:border-[#00F0FF]/50 transition-all">
          <div className="flex items-center gap-3">
            <div className="w-24 h-12 flex items-center justify-center shrink-0">
              <img
                src="https://solardelcerro.com/wp-content/uploads/2026/01/Logo-club-milenia-01-300x143.png"
                alt="Club Milenia"
                className="max-h-full max-w-full object-contain"
              />
            </div>
          </div>
          <span className="text-xs font-black text-[#00F0FF] bg-[#00F0FF]/10 px-2.5 py-1.5 rounded-xl border border-[#00F0FF]/20 shrink-0">
            2×1 / 4×2
          </span>
        </div>
      </div>

      <p className="text-[11px] text-gray-500 text-center mt-6">
        * Promociones válidas únicamente para compras directas en boletería o aplicables según disponibilidad.
      </p>
    </section>
  );
}