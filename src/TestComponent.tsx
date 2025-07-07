export default function TestComponent() {
  return (
    <div className="flex flex-col gap-4 p-10">
      <p className="hover:text-amber-300 text-xl">Hover over me!</p>
      <div className="bg-red-500 hover:bg-green-500 text-white p-4">
        Hover Me
      </div>
    </div>
  );
}