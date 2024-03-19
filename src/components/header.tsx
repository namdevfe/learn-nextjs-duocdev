import ButtonLogout from "@/components/button-logout";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";

const Header = () => {
  return (
    <header className="h-24 fixed top-0 left-0">
      <div className="container mx-auto px-5 h-full flex items-center justify-between">
        <ul className="flex items-center">
          <li>
            <Link href="/login" className="p-2 capitalize">
              Đăng nhập
            </Link>
          </li>
          <li>
            <Link href="/register" className="p-2 capitalize">
              Đăng ký
            </Link>
          </li>
          <li>
            <ButtonLogout />
          </li>
        </ul>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
