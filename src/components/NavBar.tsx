import logo from "../assets/image.png";
import {Link} from 'react-router';
import {User} from "lucide-react"; 

const NavBar = () => {
    return (
        <header className = "w-full bg-[#A8E6CF] px-6 py-4 flex items-center justify-between shadow-sm">
            <div className = "flex items-center gap-3 text-slate-800 font-medium">
                <div className = "w-10 h-10 rounded-full bg-slate-700 text-white flex items-center justify-center">
                    <User size={20} />
                </div>
                <span className="tracking-wide text-sm font-semibold">WELCOME, MENTOR</span>
            </div>

            <div className = "absolute left-1/2 transform -translate-x-1/2">
                <img 
                    src={logo}
                    alt="Restore Hope Logo"
                    className="w-12 h-12 rounded-2xl shadow-md object-cover"
                />
            </div>
            <nav className="flex items-center gap-8 text-slate-800 font-semibold text-sm">
            <Link to="/" className="hover:text-purple-900 transition-colors">HOME</Link>
            <Link to="/my-mentee" className="hover:text-purple-900 transition-colors">MY MENTEE</Link>
            <Link to="/goals" className="text-purple-900 underline underline-offset-4 decoration-2">GOALS</Link>
            <Link to="/profile" className="hover:text-purple-900 transition-colors">PROFILE</Link>
      </nav>
        </header>
    );
};

export default NavBar;