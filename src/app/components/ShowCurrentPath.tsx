interface Props {
    path: string;
}

export default function ShowCurrentPath({ path }: Props) {
  return (
    <div className="al-roles-title">
      <img src="/icons/icon-roles.svg" alt="Show Current Path" />
      <p>{path}</p>
    </div>
  );
}
