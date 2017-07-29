export function Heading(props) {
  return (
    <h1>
      {props.text} - {props.children}
    </h1>
  );
}
