import { useContext} from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../services/context/AuthContext";
import { useContextMenu } from "../../hooks";
import { LogoWithName } from "../../assets/images";

function Header() {

  const [contextMenu,setContextMenu,contextMenuRef,btnRef] = useContextMenu({visible:false,position:{x:0,y:0}});



  function handleProfileClick(event){
    event.preventDefault();
    setContextMenu({visible:!contextMenu.visible,position:{x:0,y:0}});
  }

  const {isLoggedIn,user,LogOutUser} = useContext(AuthContext);


  function ProfileMenu(){
    return(
      <div ref={contextMenuRef} className="absolute top-12 right-2 bg-white border rounded-md shadow-lg py-2 px-3 z-20">
        <button className="block py-1 px-2 hover:bg-gray-100 rounded-md" onClick={(e)=>{LogOutUser();handleProfileClick(e)}}>Log Out</button>
      </div>
    )
  }

  return (
    <nav className="border p-2 md:flex justify-between items-center gc-border-black" >
      <Link to="/"><img src={LogoWithName} alt="main logo" className="h-6" /></Link>
			<div className="text-sm">
        {
          isLoggedIn ? 
          <div ref={btnRef} className="py-1 font-semibold px-2.5 hover:scale-105 border rounded-full gc-text-green gc-border-green duration-300" onClick={handleProfileClick}>
            {user?.username[0].toUpperCase()}
          </div>:
          <Link to="/login">
              <div className="py-1 font-semibold px-2 mx-3 hover:scale-105 border rounded-md gc-text-green gc-border-green duration-300">LogIn / SignIn</div>
          </Link>
        }
      </div>	
      {contextMenu.visible && <ProfileMenu />}
		</nav>
  );
}

export default Header;