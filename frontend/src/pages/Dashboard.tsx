import { useState } from "react";
import "../App.css";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <Sidebar />
      <div className="p-6 ml-60 min-h-screen bg-gray-100">
        <CreateContentModel
          open={modalOpen}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4">
          <Button
            variant="primary"
            text="Add Content"
            startIcon={<PlusIcon />}
            onClick={() => {
              setModalOpen(true);
            }}
          />
          <Button
            variant="secondary"
            text="Share Brain"
            startIcon={<ShareIcon />}
          />
        </div>
        <div className="pt-4 flex gap-4">
          <Card
            title="First tweet"
            type="twitter"
            link="https://x.com/SahilR660620/status/1861230310148481365"
          />
          <Card
            title="First video"
            type="youtube"
            link="https://www.youtube.com/embed?v=EdLhvHBhnG8"
          />
        </div>
      </div>
    </>
  );
}
