
import { Button } from "@/components/ui/button";
import { MenuIcon } from "lucide-react";

interface HeaderProps {
  toggleSidebar: () => void;
}

const Header = ({ toggleSidebar }: HeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-4 sticky top-0 z-10">
      <Button variant="ghost" size="icon" onClick={toggleSidebar} className="mr-2">
        <MenuIcon className="h-5 w-5" />
      </Button>
      <div className="font-bold text-xl text-primary">Aurum INC</div>
    </header>
  );
};

export default Header;
