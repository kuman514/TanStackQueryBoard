interface Props {
  textValue: string;
  onChange: (newValue: string) => void;
}

export default function TextInput({ textValue, onChange }: Props) {
  return (
    <input
      className="px-6 py-4 border border-solid border-green-500 rounded-full"
      value={textValue}
      onChange={(event) => {
        onChange(event.currentTarget.value);
      }}
    />
  );
}
