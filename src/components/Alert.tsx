import "./Alert.scss";

export default function Alert({
  show,
  type,
  content,
}: {
  show: boolean;
  type: string;
  content: string;
}) {
  return (
    <div className={`alert alert-${type} ${show ? "show" : "hidden"}`}>
      {content}
    </div>
  );
}
