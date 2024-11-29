export function Input({
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
