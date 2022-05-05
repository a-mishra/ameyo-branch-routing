import "./styles.css";
import { Adder } from "./components/adder";
import { Editor } from "./components/editor";

export default function App() {
  return (
    <div className="App">
      <Adder />
      <Editor />
    </div>
  );
}
