import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";

export function CreateContentModel({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-slate-500 fixed top-0 left-0 opacity-60 flex justify-center">
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <button onClick={onClose}>
                  <CrossIcon />
                </button>
              </div>
              <div>
                <Input placeHolder="Title" />
                <Input placeHolder="link" />
              </div>
              <div className="flex justify-center">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({
  onChange,
  placeHolder,
}: {
  onChange?: () => void;
  placeHolder: string;
}) {
  return (
    <div>
      <input
        placeholder={placeHolder}
        type="text"
        className="px-4 py-2 border rounded m-2"
        onChange={onChange}
      />
    </div>
  );
}
