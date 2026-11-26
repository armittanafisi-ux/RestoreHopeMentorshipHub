import { Link } from "react-router";
import { MdAccountCircle } from "react-icons/md";
import logo from "../assets/RestoreHopeLogo.png"; // change to your actual file name

const links = [
  { label: "HOME", to: "/" },
  { label: "MY MENTEE", to: "/mentee" },
  { label: "GOALS", to: "/goals" },
  { label: "PROFILE", to: "/profile" },
];

const NavBar = () => {
  return (
    <nav className="relative flex h-20 items-center justify-between bg-[#B8DEDA] px-16 text-[#39263F]">
      <div className="flex items-center gap-4">
        <MdAccountCircle className="h-8 w-8" />
        <span className="text-base">WELCOME, MENTOR</span>
      </div>


      <img
        src={logo}
        className="absolute left-1/2 h-18 w-18 -translate-x-1/2 rounded-xl shadow-md"
      />

      <ul className="flex items-center gap-10 text-base">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="hover:underline">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;