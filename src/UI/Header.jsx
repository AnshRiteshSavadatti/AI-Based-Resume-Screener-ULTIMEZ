import { Link } from "react-router-dom";
import Button from "./Button";

function Header() {
  return (
    <header className="flex items-center justify-between bg-gray-800 p-4 text-white">
      <Link to="/" className="tracking-widest italic ">
        Resume Tracker
      </Link>
      {/* <input type="text" placeholder="Ed Sheeran: +–=÷× Tour" className="input"/> */}
    </header>
  );
}

export default Header;
