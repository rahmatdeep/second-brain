import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className=" h-screen bg-white border-r-2 w-72 fixed left-0 top-0 pl-6">
      <div className="flex items-center gap-1 text-2xl pt-6">
        <div className="text-purple-600">
          <Logo />
        </div>
        Second Brain{" "}
      </div>
      <div className="pt-6 pl-4">
        <SidebarItem title="Twitter" icon={<TwitterIcon />} />
        <SidebarItem title="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
