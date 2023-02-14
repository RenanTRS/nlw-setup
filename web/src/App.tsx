import { Header } from "./components/Header";
import { SummaryTable } from "./components/SummaryTable";
import { api } from "./lib/axios";

navigator.serviceWorker.register('service-worker.js')
  .then(async serviceWorker => {
    let subscription = await serviceWorker.pushManager.getSubscription();

    if(!subscription) {
      const publicKeyResponse = await api.get("/push/public_key");

      subscription = await serviceWorker.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicKeyResponse.data
      });
    }

    await api.post('/push/register', {subscription})
    await api.post('/push/send', {subscription})
  });

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