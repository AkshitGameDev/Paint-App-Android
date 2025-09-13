import WhiteboardCanvas from "./component"

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center">
        <h1 className="text-[50px] font-bold mb-8 text-center">
          Draw Something Biach
      </h1>
      <WhiteboardCanvas />
      </main>
    </div>
  );
}
