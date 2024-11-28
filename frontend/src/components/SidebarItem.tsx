import { ReactElement } from "react";

export function SidebarItem({
  title,
  icon,
}: {
  title: string;
  icon: ReactElement;
}) {
  return (
    <div className="flex text-gray-700 cursor-pointer py-4">
      <div className="pr-2">{icon}</div>
      <div>{title}</div>
    </div>
  );
}
