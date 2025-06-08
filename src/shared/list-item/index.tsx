interface Props {
  id: number;
  mainTitle: string;
  description: string;
  thumbnailUrl: string;
  thumbnailAlt: string;
}

export default function ListItem({
  id,
  mainTitle,
  description,
  thumbnailUrl,
  thumbnailAlt,
}: Props) {
  return (
    <li
      id={String(id)}
      className="w-1/3 sm:w-1/4 flex flex-col p-4 border border-solid border-green-500 rounded cursor-pointer hover:bg-green-300 hover:dark:bg-green-600 gap-2 [&_*]:pointer-events-none"
    >
      <img
        className="w-full aspect-square object-cover"
        src={thumbnailUrl}
        alt={thumbnailAlt}
      />
      <strong className="text-base font-bold">{mainTitle}</strong>
      <span className="text-sm font-normal">{description}</span>
    </li>
  );
}
