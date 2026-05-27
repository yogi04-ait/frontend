import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function WhatsAppButton() {
  const location = useLocation();
  // Hide on admin routes
  if (location.pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href="https://wa.me/917428700215"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
    >
      <FaWhatsapp size={32} />
    </a>
  );
}
