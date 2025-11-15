
import { Dog, BookText, Camera, Folder } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", icon: <Dog size={22} />, label: "Home" },
  { to: "/camera", icon: <Camera size={22} />, label: "Dog Vision Camera" },
  { to: "/gallery", icon: <Folder size={22} />, label: "Gallery" },
  { to: "/learn", icon: <BookText size={22} />, label: "Educational" },
];

export const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="w-full bg-white/95 border-b border-gray-200 shadow-sm z-40 sticky top-0">
      <div className="flex max-w-screen-xl mx-auto px-6 py-4 items-center gap-8">
        <div className="flex items-center gap-2 text-blue-700 font-black text-2xl select-none">
          <Dog size={30} className="text-yellow-400" />
          My Doggles
        </div>
        <div className="flex flex-1 gap-4 items-center">
          {links.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`flex items-center gap-2 px-3 py-2 rounded-md transition font-medium text-lg
                ${location.pathname === link.to
                  ? "bg-blue-50 text-blue-700"
                  : "hover:bg-blue-50/80 text-gray-700"}`}
            >
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
