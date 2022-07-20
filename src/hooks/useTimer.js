import { useSelector, useDispatch } from "react-redux";
import useInterval from "./useInterval";

import { timerActions } from "../store/timerReducer";

const useTimer = () => {
  const DEFAULT_DELAY = 1000;
  const dispatch = useDispatch();
  const isRunning = useSelector((state) => state.timer.isRunning);

  useInterval(
    () => {
      dispatch(timerActions.awareDecrease());
    },
    isRunning ? DEFAULT_DELAY : null
  );
};

export default useTimer;
