import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-[#0f172a] border-b border-gray-800 text-white">
      <div className="text-2xl font-bold tracking-wide">
        🚀 CryptoInvestment
      </div>

      <div className="flex gap-8 text-gray-400">
        <Link to="/" className="hover:text-white transition">
          Mercado
        </Link>
        <Link to="/charts" className="hover:text-white transition">
          Graficos
        </Link>
        <Link to="/portfolio" className="hover:text-white transition">
          Portafolio
        </Link>
      </div>
    </nav>
  );
}
