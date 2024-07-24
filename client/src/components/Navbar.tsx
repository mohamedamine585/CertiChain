import { Button } from './ui/button';



function Navbar() {
  return (
    <nav className=" text-white flex items-center px-4 py-8">
      <div className="flex items-center justify-between w-full max-w-screen-xl mx-auto ">
      <h1 className="text-2xl font-bold text-white">CertiChain</h1>
        <div className="flex items-center space-x-6">
          <div className="flex mr-28 space-x-6">
            
            <a href="/" className="hover:underline">HOME</a>
            <a href="/about" className="hover:underline">ABOUT US</a>
            <a href="/contact" className="hover:underline">CONTACT US</a>
            <a href="/become-an-issuer" className="hover:underline">BECOME AN ISSUER</a>
          </div>
          <Button className="bg-white text-black flex items-center space-x-6 w-[150PX]  hover:bg-blue-600">
            <span>Login</span>
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
