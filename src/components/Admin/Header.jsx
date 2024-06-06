import { IoMenu } from "react-icons/io5";
import PropTypes from "prop-types";

import { LogoWithName } from "../../assets/images";
import { Link } from "react-router-dom";

function Header({sidebarToggler}) {
  return (
    <header className="border p-2 md:flex justify-between items-center gc-border-black">
        <IoMenu className="text-3xl hover:scale-110" onClick={()=>sidebarToggler(p=>!p)} />
        <Link to="/"><img className="h-6" src={LogoWithName} alt="logo" /></Link>
        <div className="gc-text-green"></div>
    </header>
  );
}

Header.propTypes = {
    sidebarToggler: PropTypes.func.isRequired
}



export default Header;