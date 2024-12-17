import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Rocket } from "lucide-react";
import { useSpring, animated } from "@react-spring/web";
import { Button } from "@/components/ui/button";

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
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white bg-gradient-to-r from-indigo-900 via-purple-800 to-pink-600">
      {/* Alert Icon */}
      <AlertTriangle className="w-24 h-24 mb-6 text-yellow-400" />

      {/* Main 404 Heading */}
      <h1 className="font-extrabold text-7xl">404</h1>

      {/* Description */}
      <p className="max-w-lg mt-4 text-xl text-center">
        Oops! The page you&apos;re looking for doesn&apos;t exist.
      </p>

      {/* Buttons */}
      <div className="flex mt-8 space-x-4">
        <Button
        onClick={() => navigate('/')} 
         className="flex items-center px-6 font-semibold text-gray-900 transition duration-300 bg-yellow-400 rounded-lg shadow-lg py-7 hover:bg-yellow-300"
        >
          Back to Home
        </Button>

        {/* Rocket Launch Button */}
        <animated.button
          style={rocketAnimation}
          onClick={() => setIsLaunching(true)} 
          className="flex items-center px-6 py-3 font-semibold text-gray-900 transition duration-300 bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-300"
        >
          <Rocket className="w-5 h-5 mr-2" />
          Launch to Support
        </animated.button>
      </div>
    </div>
  );
}

export default Error;
