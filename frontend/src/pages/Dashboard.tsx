import { useState } from "react";
import "../App.css";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { CreateContentModel } from "../components/CreateContentModel";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Sidebar } from "../components/Sidebar";
import { useContents } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../../config";

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { contents } = useContents();
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
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    Authorization: localStorage.getItem("token"),
                  },
                },
              );
              const shareUrl = `http://localhost:5173${response.data.message}`;
              navigator.clipboard.writeText(shareUrl);
              console.log(shareUrl);
              alert(shareUrl);
            }}
          />
        </div>
        <div className="pt-4 flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card title={title} type={type} link={link} />
          ))}
        </div>
      </div>
    </>
  );
}
