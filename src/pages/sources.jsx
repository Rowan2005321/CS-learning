import { createRoot } from "react-dom/client";
import { App } from "../App";
import { PAGE_IDS } from "../app/navigation";
import "../styles.css";

createRoot(document.getElementById("root")).render(<App pageId={PAGE_IDS.sources} />);
