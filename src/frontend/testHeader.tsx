/* Header for testing search results view (don't merge!!!) */

export default function TestHeader(){
  const buttonMap = ["Search",
                    "My List",
                    "Account"]

  function HeaderButtonsCB(buttonContent: string){
    const link = buttonContent.toLowerCase().replaceAll(" ", "");
    return (
      <li key={link} className="grow hover:shadow-lg">
		<button className="bg-[#312244] hover:bg-[#251a33]">
		{buttonContent}
		</button>
      </li>
    );
  }
  return (
    <div className="shrink-0 grow-0">
      <div className="px-5 py-7 flex justify-evenly items-center bg-[#312244]">
        <div className="hidden lg:flex">
          <h1 className="font-bold text-2xl py-2 mr-20">My Friday Night List</h1>
          <div className="flex">
            <div className="flex w-72">
              <input className="outline-none w-72 rounded-lg bg-[#212F45] pl-4" type="text" placeholder="Search..." />
            </div>
            <ul className="flex space-x-12">
              {buttonMap.map(HeaderButtonsCB)}
            </ul>
          </div>
        </div>
        
        <div className="flex px-5 justify-start items-center lg:hidden">
          <h1 className="font-bold text-xl mr-10">M.F.N.L</h1>
          <div className="flex ml-2 w-50 h-12">
              <input className="outline-none w-50 rounded-lg bg-[#212F45] pl-4" type="text" placeholder="Search..." />
          </div>
          <button className="bg-[#312244]"><img src="hamburger.png" 
              className="w-10 h-10 outline-white"></img>
          </button>
        </div>
      </div>
    </div>);
}