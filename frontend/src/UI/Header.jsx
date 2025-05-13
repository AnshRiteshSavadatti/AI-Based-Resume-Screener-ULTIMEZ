import { Link } from "react-router-dom";
import Button from "./Button";

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <Link
        to="/"
        className="tracking-widest italic text-xl text-gray-200"
        // style={{ fontFamily: '"Pacifico", cursive' }}
      >
        {/* <img src="\Habit tracker.png" alt="Logo" className="h-12 w-30 mr-2" /> */}
        Resume Scanner
      </Link>
      <p className="text-sm text-gray-200 italic font-light tracking-wide">
        Smartly scan, swiftly shortlist
      </p>
    </header>
  );
}

export default Header;
