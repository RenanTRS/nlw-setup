import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";

export function App() {
  return (
    <div className="bg-background text-white h-screen w-screen flex justify-center items-center">
      <div className="w-full max-w-5xl px-4 flex flex-col gap-16">
        <Header />
        <SummaryTable />
      </div>
    </div>
  );
}
