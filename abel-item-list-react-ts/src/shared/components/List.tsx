interface Item {
  label: string;
  selected: boolean;
}

interface ListProps {
  list: Item[];
  onToggle: (index: number) => void;
  onDeleteItem: (index: number) => void;
}

export default function List({ list, onToggle, onDeleteItem }: ListProps) {
  return (
    <ul className="card__list">
      {list.map((item, index) => (
        <li
          key={index}
          className={`card__item ${item.selected ? "selected" : ""}`}
          onDoubleClick={() => onDeleteItem(index)}
          tabIndex={0}
          aria-label={`Item: ${item.label}`}
        >
          <label>
            <input
              type="checkbox"
              checked={item.selected}
              onChange={() => onToggle(index)}
              aria-checked={item.selected}
            />
            <span>{item.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
}
