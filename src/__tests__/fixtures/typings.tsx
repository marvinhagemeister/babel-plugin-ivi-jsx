export interface Props {
  text: string;
}

export default function Foo(props: Props) {
  return (
    <h1>
      {props.text}
    </h1>
  );
}

export function Bar() {
  return <Foo text={"as"} />;
}

// export function Simple(text: string) {
//   return (
//     <p>
//       {text}
//     </p>
//   );
// }

// export function UseSimlpe() {
//   return <Simple />;
// }
