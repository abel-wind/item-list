import { useState } from "react";
import Modal from "./shared/components/Modal";
import List from "./shared/components/List";
import Button from "./shared/components/Button";

interface Item {
  label: string;
  selected: boolean;
}

export default function App() {
  const [list, setList] = useState<Item[]>([]);
  const [history, setHistory] = useState<Item[][]>([]);
  const [showModal, setShowModal] = useState(false);

  const saveToHistory = () => {
    setHistory((prev) => [...prev, [...list]]);
  };

  const addItem = (label: string) => {
    saveToHistory();
    setList([...list, { label, selected: false }]);
  };

  const deleteSelectedItems = () => {
    saveToHistory();
    setList(list.filter((item) => !item.selected));
  };

  const undo = () => {
    if (history.length > 0) {
      const prev = [...history];
      const last = prev.pop();
      if (last) {
        setList(last);
        setHistory(prev);
      }
    }
  };

  const toggleSelect = (index: number) => {
    const updated = [...list];
    updated[index].selected = !updated[index].selected;
    setList(updated);
  };

  const deleteItem = (index: number) => {
    saveToHistory();
    const updated = [...list];
    updated.splice(index, 1);
    setList(updated);
  };

  return (
    <section className="card">
      <h1 className="card__title">This is a technical proof</h1>
      <p className="card__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Lacinia
        habitasse arcu molestie maecenas cursus quam nunc, hendrerit posuere
        augue fames dictumst placerat porttitor, dis mi pharetra vestibulum
        venenatis phasellus.
      </p>

      <List list={list} onToggle={toggleSelect} onDeleteItem={deleteItem} />

      <div className="card__footer">
        <div className="footer__left">
          <Button
            onClick={undo}
            theme="secondary"
            disabled={history.length === 0}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transform: "rotateY(180deg)" }}
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" />
              <path d="M20 4v5h-5" />
            </svg>
          </Button>
          <Button
            onClick={() => deleteSelectedItems()}
            theme="secondary"
            disabled={!list.some((item) => item.selected)}
          >
            DELETE
          </Button>
        </div>

        <Button onClick={() => setShowModal(true)}>ADD</Button>
      </div>

      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onSubmit={(value) => {
            addItem(value);
            setShowModal(false);
          }}
        />
      )}
    </section>
  );
}
