import { Button } from './ui/button';



function Navbar() {
  return (
    <nav className=" text-black flex items-center px-4 py-8 bg-[#f8f7f4] ">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto ">
      <h1 className="text-2xl font-bold text-black">CertiChain</h1>
        <div className="flex items-center space-x-6">
          <div className="flex mr-28 space-x-6">
            
          <a
  href="/"
  className="relative inline-block px-4 py-2 bg-slate-800 text-white rounded-full hover:underline"
>
  HOME
</a>
<a
  href="/"
  className="relative inline-block px-4 py-2 bg-slate-800 text-white rounded-full hover:underline"
>
  ABOUT US
</a>
<a
  href="/"
  className="relative inline-block px-4 py-2 bg-slate-800 text-white rounded-full hover:underline"
>
  CONTACT US
</a>
<a
  href="/"
  className="relative inline-block px-4 py-2  bg-slate-800 text-white rounded-full hover:underline"
>
  BECOME AN ISSUER
</a>
          </div>
          <Button className="bg-black text-white flex items-center space-x-6 w-[150PX]  hover:bg-blue-600 rounded-xl">
            <span>Login</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
