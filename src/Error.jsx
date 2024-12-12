import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Rocket } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "./components/ui/button";

function Error() {
  const [isLaunching, setIsLaunching] = useState(false);
  const navigate = useNavigate();

  // Rocket Launch Animation
  const rocketAnimation = useSpring({
    transform: isLaunching
      ? "translateY(-500px) scale(1.5)" 
      : "translateY(0px) scale(1)",
    opacity: isLaunching ? 0 : 1, 
    config: { duration: 1000 },
    onRest: () => {
      if (isLaunching) navigate("/contact"); 
    },
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-600 text-white p-6">
      {/* Alert Icon */}
      <AlertTriangle className="w-24 h-24 text-yellow-400 mb-6" />

      {/* Main 404 Heading */}
      <h1 className="text-7xl font-extrabold">404</h1>

      {/* Description */}
      <p className="text-xl mt-4 text-center max-w-lg">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {/* Buttons */}
      <div className="flex space-x-4 mt-8">
        <Button
        onClick={() => navigate('/')} 
         className="flex items-center bg-yellow-400 text-gray-900 font-semibold px-6 py-7 rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300"
        >
          Back to Home
        </Button>

        {/* Rocket Launch Button */}
        <animated.button
          style={rocketAnimation}
          onClick={() => setIsLaunching(true)} 
          className="flex items-center bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-300 transition duration-300"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Launch to Support
        </animated.button>
      </div>
    </div>
  );
}

export default Error;
