import { ReactElement } from "react";

export function SidebarItem({
  title,
  icon,
}: {
  title: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 cursor-pointer py-2 justify-center hover:bg-purple-500 hover:text-white rounded-sm w-11/12">
      <div className="pr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
