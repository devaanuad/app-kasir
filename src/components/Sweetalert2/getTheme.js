import { useContext } from "react";
import { WindmillContext } from "@windmill/react-ui";

function GetThemee() {
  const { mode, toggleMode } = useContext(WindmillContext);
  return mode;
}

export default GetThemee;
