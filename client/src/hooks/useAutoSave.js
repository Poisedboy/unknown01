import { useDispatch } from "react-redux";
import { autoUpdateSprint } from "redux/noteEditorSlice";

const { useEffect } = require("react");

const useAutosave = (sprint, delay = 3000) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(autoUpdateSprint(sprint));
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [sprint, delay]);
};

export { useAutosave };
