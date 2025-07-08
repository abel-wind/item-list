import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Button from "./Button";

interface ModalProps {
  onClose: () => void;
  onSubmit: (value: string) => void;
}

export default function Modal({ onClose, onSubmit }: ModalProps) {
  const [value, setValue] = useState("");
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed) onSubmit(trimmed);
    setValue("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClose = () => {
    setHidden(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`modal ${hidden ? "modal--hidden" : ""}`}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <form className="modal__form" onSubmit={handleSubmit} autoComplete="off">
        <div className="field">
          <label htmlFor="item-input">Add item to list</label>
          <input
            id="item-input"
            type="text"
            placeholder="Type the text here..."
            value={value}
            onChange={handleChange}
            autoFocus
          />
        </div>
        <div className="modal__bottom">
          <Button type="submit" theme="primary">
            ADD
          </Button>
          <Button onClick={handleClose} theme="secondary">
            CANCEL
          </Button>
        </div>
      </form>
    </div>
  );
}
