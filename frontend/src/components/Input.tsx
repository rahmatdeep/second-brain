export function Input({
  placeHolder,
  reference,
}: {
  placeHolder: string;
  reference?: any;
}) {
  return (
    <div>
      <input
        placeholder={placeHolder}
        type="text"
        className="px-4 py-2 border rounded m-2"
        ref={reference}
      />
    </div>
  );
}
