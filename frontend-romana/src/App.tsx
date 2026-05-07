import { useAuthInitialize } from "@/modules/auth/hooks/useAuthInitialize";

function App() {
  useAuthInitialize();

  return (
    <div>
      APP
    </div>
  );
}

export default App;