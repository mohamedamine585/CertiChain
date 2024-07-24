
import imagelogo from "../assets/image logo.png"; // Assurez-vous que le chemin est correct
import { Button } from './ui/button';

function HomeBody() {
  return (
    <div className="flex ml-8 ">
      <div className="flex flex-col justify-center items-start w-1/2 p-6 space-y-4 ml-24 ">
        <div className="flex items-center space-x-4 mb-6 ">
          <img src={imagelogo} alt="Logo" className="h-24 " />
          <div className="flex flex-col">
            <h1 className="text-4xl font-bold text-gray-800">CertiChain</h1>
            <p className="text-xl text-gray-600 mt-2">Empowering Trust!</p>
          </div>
        </div>
        <p className="text-lg text-gray-700 mb-6 px-4 md:px-0">
          CertiChain is an open standard designed for issuing, viewing, and verifying certificates using blockchain technology. 
          It offers a way to securely and transparently manage certifications, making them tamper-proof and easily verifiable.
        </p>
        <div className="flex justify-center ">
          <Button className="bg-blue-500 text-white hover:bg-blue-600 px-16 py-2 rounded">
            Read more about us
          </Button>
        </div>
      </div>
      <div className="w-1/2"></div>
    </div>
  );
}

export default HomeBody;
