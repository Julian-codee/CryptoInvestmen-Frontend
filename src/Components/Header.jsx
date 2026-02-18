import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-5 bg-[#111] border-b border-[#222] text-white font-sans">
      {/* Logo */}
      <div className="text-xl font-bold">CryptoInvestMent</div>

      {/* Navegacion */}

      <div className="flex gap-5">
        <Link to="/" className="text-[#aaa] hover:text-white transition-colors">
          Mercado
        </Link>
        <Link
          to="/charts"
          className="text-[#aaa] hover:text-white transition-colors"
        >
          Graficos
        </Link>
        <Link
          to="/portfolio"
          className="text-[#aaa] hover:text-white transition-colors"
        >
          Mi Portafolio
        </Link>
      </div>
    </nav>
  );
}
