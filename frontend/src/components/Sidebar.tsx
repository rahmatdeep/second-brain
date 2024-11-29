import { Logo } from "../icons/Logo";
import { TwitterIcon } from "../icons/TwitterIcon";
import { YoutubeIcon } from "../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
  return (
    <div className=" h-screen bg-white border-r-2 w-60 fixed left-0 top-0">
      <div className="flex justify-center items-center gap-1 text-2xl pt-6">
        <div className="text-purple-600">
          <Logo />
        </div>
        Second Brain{" "}
      </div>
      <div className=" flex items-center flex-col pt-6 gap-2">
        <SidebarItem title="Twitter" icon={<TwitterIcon />} />
        <SidebarItem title="Youtube" icon={<YoutubeIcon />} />
      </div>
    </div>
  );
}
