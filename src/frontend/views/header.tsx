// Init Header
import {Link} from "react-router-dom"
import r from "react"



export default function Header(){
  const buttonMap = ["Search",
                    "My List",
                    "Log Out"]
  const [menuClicked, setMenuClicked] = r.useState(false);

  function HeaderButtonsCB(buttonContent: string){
    const link = buttonContent.toLowerCase().replaceAll(" ", "");
    return (
      <li key={link} className="grow hover:shadow-lg  opacity-100">
        <Link to={link}>
          <button className="bg-[#312244] hover:bg-[#251a33]" onClick={() => setMenuClicked(false)}>
            {buttonContent}
          </button>
        </Link>
      </li>
    );
  }

  return (
    <div>
      <div className="px-5 py-7 flex justify-evenly items-center bg-[#312244]">
        <div className="hidden lg:flex">
          <h1 className="font-bold text-2xl py-2 mr-20">My Friday Night List</h1>
          <div className="flex">
            <div className="flex w-72 mr-4">
              <input className="outline-none w-72 rounded-lg bg-[#212F45] pl-4" type="text" placeholder="Search..." />
            </div>
            <ul className="flex space-x-2">
              {buttonMap.map(HeaderButtonsCB)}
            </ul>
          </div>
        </div>
        
        <div className="flex justify-between w-full items-center lg:hidden ">
          <h1 className="font-bold text-xl mr-10">M.F.N.L</h1>
          <div className="flex h-12">
              <input className="outline-none w-full rounded-lg bg-[#212F45] pl-4" type="text" placeholder="Search..." />
          </div>
          <div className="flex justify-end items-end">
            <button className="bg-[#312244]" onClick={()=> setMenuClicked(!menuClicked)}><img src="https://cpb-us-w2.wpmucdn.com/sites.widener.edu/dist/7/57/files/2019/03/Hamburger_icon_svg.png" 
              className="w-full h-12 outline-white"></img>
            </button>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col justify-end text-center items-end bg-[#312244] lg:hidden ">
      <ul className={menuClicked ? "transition ease-in delay-90 opacity-100 shadow-lg" : "w-0 h-0 opacity-10"}>{buttonMap.map(HeaderButtonsCB)}</ul>
      </div>
    </div>);
}