import "./App.css";
import { Button } from "./components/Button";
import { Card } from "./components/Card";
import { PlusIcon } from "./icons/PlusIcon";
import { ShareIcon } from "./icons/ShareIcon";

function App() {
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button variant="primary" text="Add Content" startIcon={<PlusIcon />} />
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />}
        />
      </div>
      <div className="flex gap-4">
        <Card
          title="First tweet"
          type="twitter"
          link="https://x.com/SahilR660620/status/1861230310148481365"
        />
        <Card
          title="First video"
          type="youtube"
          link="https://www.youtube.com/watch?v=EdLhvHBhnG8"
        />
      </div>
    </div>
  );
}

export default App;
