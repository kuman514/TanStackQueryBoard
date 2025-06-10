interface Props {
  isMultiLine: boolean;
  textValue: string;
  onChange: (newValue: string) => void;
}

export default function TextInput({ isMultiLine, textValue, onChange }: Props) {
  return isMultiLine ? (
    <textarea
      className="w-full px-6 py-4 border border-solid border-green-500 rounded-4xl"
      value={textValue}
      onChange={(event) => {
        onChange(event.currentTarget.value);
      }}
    />
  ) : (
    <input
      className="w-full px-6 py-4 border border-solid border-green-500 rounded-full"
      value={textValue}
      onChange={(event) => {
        onChange(event.currentTarget.value);
      }}
    />
  );
}
