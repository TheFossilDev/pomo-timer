export default function ShadowCard(props : any) {
  return (
    <div className="flex items-center justify-center w-fit h-fit p-3 m-3 border-2 border-gray-400 rounded-lg drop-shadow-lg">
      {props.children}
    </div>
  );
}
