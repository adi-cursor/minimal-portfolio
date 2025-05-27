import { Email, navList } from "../constants"

const Navbar = () => {
  return (
    <header className="fixed left-1/2 top-0 -translate-x-1/2 h-[70px] w-full md:w-11/12 max-w-8xl flex justify-between items-center px-2 md:px-8 py-3 my-2 md:my-3 left bg-black bg-opacity-10 z-20 backdrop-blur-sm rounded-lg">
            <nav className="h-full w-full flex justify-between items-center">
                <h1 className="text-3xl md:text-2xl text-white px-3 font-popins font-extralight">Adi.</h1>
                <div className=" hidden md:flex h-full gap-6 lg:gap-0 w-1/3 justify-evenly items-center">
                    {navList.map((nav, i) =>(
                        <div key={i} className="text-lg text-white cursor-pointer hover:text-gray-400 transition-all">
                           <a href={nav.link} target="_blank">{ nav.name }</a>
                        </div> 
                    ))}
                </div>
                <div className="hidden md:flex text-base items-center text-white cursor-pointer hover:text-gray-400 transition-all">
                  <a href="mailto:adityajoshi0817@gmail.com" target="_blank">{ Email.mailId }</a>
                </div>
                <div className="flex md:hidden h-full w-[150px] justify-evenly items-center">
                    {navList.map((nav, i) =>(
                        <div key={i} className=" min-h-[22px] min-w-[22px] ">
                           <a href={nav.link} target="_blank"><img className="h-[22px] w-[22px] object-contain " src={nav.logo } alt="" /></a>
                        </div> 
                    ))}                        
                    <a href="mailto:adityajoshi0817@gmail.com" target="_blank"><img className="h-[22px] w-[22px] object-contain" src={ Email.mailIcon } alt="" /></a>
                </div>
                
            </nav>
    </header>
  )
}

export default Navbar 