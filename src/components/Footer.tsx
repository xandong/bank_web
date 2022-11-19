import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="font-medium w-full p-6 mt-6 text-center italic text-[1.125rem]">
      Desenvolvido por{" "}
      <Link to="https://github.com/xandong" target={"_blank"}>
        Alexandre Gurgel.
      </Link>
    </footer>
  );
}
