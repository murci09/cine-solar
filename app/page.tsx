"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import MovieCard, { MovieProps } from "@/components/movies/MovieCard";
import ShowtimeModal from "@/components/movies/ShowtimeModal";
import SeatPicker from "@/components/checkout/SeatPicker";
import CheckoutModal from "@/components/checkout/CheckoutModal";
import PromotionsSection from "@/components/promotions/PromotionsSection";

const Hero3D = dynamic(() => import("@/components/hero/Hero3D"), {
  ssr: false,
});

// Películas con Posters Oficiales de Cines del Solar
const MOVIES_DATA: MovieProps[] = [
  {
    id: "1",
    title: "Toy Story 5",
    genre: "Animación / Infantil",
    duration: "100 min",
    rating: "ATP",
    format: ["3D", "2D", "DOBLADA"],
    posterUrl: "https://solardelcerro.com/wp-content/uploads/2026/06/poster-web_EL-GUARDIAN.png",
    showtimes: ["15:00 Hs", "17:15 Hs", "19:30 Hs", "21:45 Hs"],
  },
  {
    id: "2",
    title: "Moana 2",
    genre: "Animación / Aventura",
    duration: "105 min",
    rating: "ATP",
    format: ["3D", "2D", "DOBLADA"],
    posterUrl: "https://solardelcerro.com/wp-content/uploads/2026/07/poster-web.png",
    showtimes: ["16:00 Hs", "18:15 Hs", "20:30 Hs"],
  },
  {
    id: "3",
    title: "Minions y Monstruos",
    genre: "Comedia / Animación",
    duration: "92 min",
    rating: "ATP",
    format: ["2D", "DOBLADA"],
    posterUrl: "https://solardelcerro.com/wp-content/uploads/2026/07/poster-web_IRON-LUNG.png",
    showtimes: ["14:30 Hs", "16:45 Hs", "19:00 Hs"],
  },
  {
    id: "4",
    title: "La Odisea",
    genre: "Acción / Drama Histórico",
    duration: "150 min",
    rating: "SAM 13",
    format: ["2D", "SUBTITULADA"],
    posterUrl: "https://solardelcerro.com/wp-content/uploads/2026/07/IMG_6359-768x1097.jpeg",
    showtimes: ["18:00 Hs", "21:00 Hs", "23:45 Hs"],
  },
  {
    id: "5",
    title: "Evil Dead: En Llamas",
    genre: "Terror",
    duration: "108 min",
    rating: "SAM 16",
    format: ["2D", "SUBTITULADA"],
    posterUrl: "https://solardelcerro.com/wp-content/uploads/2026/07/poster-web-1.png",
    showtimes: ["20:15 Hs", "22:30 Hs", "00:45 Hs"],
  },
];

// Función para determinar si el día actual es de promoción (Lunes=1, Martes=2, Miércoles=3)
const getInitialPricing = () => {
  const day = new Date().getDay();
  const isPromo = day >= 1 && day <= 3; // Lunes, Martes o Miércoles

  return {
    price2D: isPromo ? 8000 : 14000,
    price3D: isPromo ? 9000 : 15000,
    isPromoDay: isPromo,
    dayLabel: isPromo
      ? "Promoción Lunes a Miércoles"
      : "Jueves a Domingos y Feriados",
  };
};

export default function Home() {
  const [selectedMovie, setSelectedMovie] = useState<MovieProps | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Todas");
  const [activeMovieForSeats, setActiveMovieForSeats] = useState<{
    movie: MovieProps;
    showtime: string;
  } | null>(null);

  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    movieTitle: "",
    showtime: "",
    format: "2D",
    seatsCount: 0,
    totalPrice: 0,
  });

  // Estado inicial calculado dinámicamente desde el primer render
  const [pricing] = useState(getInitialPricing);

  const seatSectionRef = useRef<HTMLDivElement>(null);

  const handleSelectMovie = (movie: MovieProps) => {
    setSelectedMovie(movie);
  };

  const handleSelectShowtime = (movie: MovieProps, showtime: string) => {
    setSelectedMovie(null);
    setActiveMovieForSeats({ movie, showtime });

    setTimeout(() => {
      seatSectionRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleConfirmSeats = (seats: any[], total: number) => {
    if (!activeMovieForSeats) return;

    setBookingData({
      movieTitle: activeMovieForSeats.movie.title,
      showtime: `${activeMovieForSeats.showtime} - Sala del Solar`,
      format: activeMovieForSeats.movie.format[0],
      seatsCount: seats.length,
      totalPrice: total,
    });
    setIsCheckoutOpen(true);
  };

  // Filtrado de películas por categoría
  const filteredMovies = MOVIES_DATA.filter((movie) => {
    if (selectedCategory === "Todas") return true;
    if (selectedCategory === "Animación") return movie.genre.includes("Animación");
    if (selectedCategory === "Acción") return movie.genre.includes("Acción");
    if (selectedCategory === "Terror") return movie.genre.includes("Terror");
    return true;
  });

  return (
    <main className="min-h-screen bg-[#050508] text-white selection:bg-[#FFC857] selection:text-black pb-20">
      
      {/* Banner Oficial del Hero (Desktop + Mobile Nativo) */}
      <section className="relative w-full overflow-hidden shadow-2xl border-b border-white/10">
        
        {/* --- VERSION ESCRITORIO --- */}
        <div className="hidden md:block relative w-full h-[380px] md:h-[480px] lg:h-[550px]">
          <img
            src="https://solardelcerro.com/wp-content/uploads/2026/01/banners-cine-web-scaled.jpg"
            alt="Nuevos Cines del Solar Banner Desktop"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-black/20" />
        </div>

        {/* --- VERSION CELULAR --- */}
        <div className="block md:hidden relative w-full h-[360px] xs:h-[420px]">
          <img
            src="https://solardelcerro.com/wp-content/uploads/2026/01/banners-cine-web-mobile.jpg"
            alt="Nuevos Cines del Solar Banner Mobile"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-transparent to-black/20" />
        </div>

        {/* Tarjeta de Precios Dinámica */}
        <div className="max-w-7xl mx-auto px-6 md:px-16 -mt-8 sm:-mt-10 relative z-10 flex flex-wrap gap-4 items-center justify-between pb-2">
          <div className="bg-[#0D0E15]/90 backdrop-blur-xl border border-white/10 px-5 py-2.5 sm:px-6 sm:py-3 rounded-2xl flex items-center gap-4 sm:gap-6 shadow-2xl w-full sm:w-auto justify-around">
            {pricing.isPromoDay && (
              <span className="bg-[#FFC857] text-black text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider">
                PROMO DÍA
              </span>
            )}
            <div>
              <span className="text-[10px] uppercase text-gray-400 font-bold block">
                Funciones 2D
              </span>
              <span className="text-lg sm:text-xl font-black text-white">
                ${pricing.price2D.toLocaleString("es-AR")}
              </span>
            </div>
            <div className="w-[1px] h-7 bg-white/10" />
            <div>
              <span className="text-[10px] uppercase text-gray-400 font-bold block">
                Funciones 3D
              </span>
              <span className="text-lg sm:text-xl font-black text-[#FFC857]">
                ${pricing.price3D.toLocaleString("es-AR")}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 bg-white/5 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 font-medium">
              📅 Tarifa actual: <strong className="text-white">{pricing.dayLabel}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* Sección Informativa de Tarifas Oficiales */}
      <section className="max-w-7xl mx-auto px-6 md:px-16 pt-8 pb-4">
        <div className="bg-gradient-to-r from-blue-900/30 via-[#0D0E15] to-purple-900/20 border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1">
            <span className="text-xs font-bold text-[#FFC857] uppercase tracking-wider">
              Tarifas Oficiales
            </span>
            <h3 className="text-xl font-black text-white">
              Entradas & Horarios Especiales
            </h3>
            <p className="text-xs text-gray-400">
              Lunes, Martes y Miércoles promo a <strong>$8.000 (2D)</strong> / <strong>$9.000 (3D)</strong> (excepto feriados).
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              🌙 <strong>Trasnoches:</strong> Viernes y Sábados
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10">
              🎟️ <strong>Fin de Semana:</strong> $14.000 / $15.000
            </div>
          </div>
        </div>
      </section>

      {/* Cartelera */}
      <section className="px-6 md:px-16 py-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <span className="text-xs font-bold tracking-widest text-[#FFC857] uppercase">
              Programación Hoy
            </span>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white mt-1">
              En Cartelera
            </h2>
          </div>

          {/* Filtros de Categoría */}
          <div className="flex flex-wrap gap-2">
            {["Todas", "Animación", "Acción", "Terror"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedCategory === cat
                    ? "bg-[#FFC857] text-black shadow-lg"
                    : "bg-white/5 text-gray-400 hover:bg-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grilla de Películas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onSelect={handleSelectMovie}
            />
          ))}
        </div>
      </section>

      {/* Modal de Horarios */}
      <ShowtimeModal
        movie={selectedMovie}
        onClose={() => setSelectedMovie(null)}
        onSelectShowtime={handleSelectShowtime}
      />

      {/* Selector de Asientos */}
      <div ref={seatSectionRef}>
        {activeMovieForSeats ? (
          <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto border-t border-white/10">
            <SeatPicker
              movieTitle={activeMovieForSeats.movie.title}
              showtime={`${activeMovieForSeats.showtime} - Sala del Solar`}
              format={activeMovieForSeats.movie.format[0]}
              onConfirm={handleConfirmSeats}
            />
          </section>
        ) : (
          <section className="px-6 md:px-16 py-12 max-w-7xl mx-auto text-center border-t border-white/10">
            <p className="text-gray-500 text-sm">
              👆 Seleccioná una película de la cartelera para abrir la sala y comprar entradas.
            </p>
          </section>
        )}
      </div>

      {/* Sección de Promociones (Combos y 2x1) */}
      <PromotionsSection />

      {/* Modal de Pago Mercado Pago */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        movieTitle={bookingData.movieTitle}
        showtime={bookingData.showtime}
        seatsCount={bookingData.seatsCount}
        totalPrice={bookingData.totalPrice}
      />
    </main>
  );
}