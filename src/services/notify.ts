import { Notyf } from "notyf";
import "notyf/notyf.min.css";

export const notify = new Notyf({
  duration: 5000,
  position: { x: "right", y: "bottom" },
});
