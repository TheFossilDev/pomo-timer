import IconSolidButton from "./UI/Buttons/IconSolidButton";
import { FaFastForward, FaCogs } from "react-icons/fa";
import BigButton from "./UI/Buttons/BigButton";

export default function Timer(props : any) {
  return (
    <div>
      <div className="flex justify-center">
        {/* Minutes Seconds */}
        <h1 className="text-8xl">05</h1>
        <h1 className="text-8xl">:</h1>
        <h1 className="text-8xl">30</h1>
      </div>
      <div className="flex justify-center items-center">
        {/* Control buttons */}
        <IconSolidButton><FaCogs size="40" /></IconSolidButton>
        <BigButton onClick={() => console.log("BigButton clicked")}></BigButton>
        <IconSolidButton><FaFastForward size="40" /></IconSolidButton>
      </div>
    </div>
  );
};
