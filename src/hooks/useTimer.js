import { useSelector, useDispatch } from "react-redux";
import useInterval from "./useInterval";

import { timerActions } from "../Store/timerReducer";

const useTimer = () => {
  const DEFAULT_DELAY = 1000;
  const dispatch = useDispatch();
  const timerState = useSelector((state) => state.timer.timerState);

  useInterval(
    () => {
      dispatch(timerActions.awareDecrease());
    },
    timerState === "running" ? DEFAULT_DELAY : null
  );
};

export default useTimer;
