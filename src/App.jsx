import { Filters } from "./components/Filters";
import { Message } from "./components/Message";
import { FlatsViewer } from "./components/FlatsViewer";

function App() {
  return (
    <div className="overflow-hidden h-screen">
      <Filters />
      <FlatsViewer className="absolute inset-y-0 right-0" />
      <Message className="absolute bottom-0 right-0" />
    </div>
  );
}

export default App;
