import IconSolidButton from "./UI/Buttons/IconSolidButton";
import { FaFastForward, FaCogs } from "react-icons/fa";
import { useState, useRef, useEffect, useCallback } from "react";
import BigButton from "./UI/Buttons/BigButton";
import { useWorker, WORKER_STATUS } from "@koale/useworker";


export default function Timer(props : any) {
  const workerRef = useRef<Worker>()

  useEffect(() => {
    workerRef.current = new Worker(new URL('../timer.worker.ts', import.meta.url))
    workerRef.current.onmessage = (event: MessageEvent<number>) =>
      alert(`WebWorker Response => ${event.data}`)
    return () => {
      workerRef.current?.terminate()
    }
  }, [])

  const handleWork = useCallback(async () => {
    workerRef.current?.postMessage(100000)
  }, [])



  const [isRunning, setIsRunning] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(25 * 60);
  const [timerWorker, { status: timerWorkerStatus, kill: timerWorkerKill } ] = useWorker(operateTimer);
  function operateTimer() {
    while (secondsRemaining >= 0 ) {
      delayedFunction(1000);
      setSecondsRemaining(prevSeconds => prevSeconds - 1);
    }
  };

  function delayedFunction(delay: number) {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve(); // Resolving the promise after the delay
      }, delay);
    });
  }
  const handleTimerClick = () => {
    if (isRunning) {
      // Terminate the worker
      timerWorkerKill();
      console.log("Worker stopped");
      setIsRunning(false);
    } else {
      // Spawn and start the worker
      timerWorker();
      console.log("Worker created");
      setIsRunning(true);
    }
  };
  
  return (
    <div>
      <div className="flex justify-center">
        {/* Minutes Seconds */}
        <h1 className="text-8xl">{secondsRemaining / 60}</h1>
        <h1 className="text-8xl">:</h1>
        <h1 className="text-8xl">{secondsRemaining % 60 < 10 ? "0" : ""}{secondsRemaining % 60}</h1>
      </div>
      <div className="flex justify-center items-center">
        {/* Control buttons */}
        {/* <IconSolidButton><FaCogs size="40" /></IconSolidButton> */}
        <BigButton isRunning={isRunning} onClick={() => handleWork()}></BigButton>
        {/* <BigButton isRunning={isRunning} onClick={() => handleTimerClick()}></BigButton> */}
        {/* <IconSolidButton><FaFastForward size="40" /></IconSolidButton> */}
      </div>
    </div>
  );
};


