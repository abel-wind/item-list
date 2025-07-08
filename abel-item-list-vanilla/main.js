class ItemListApp {
  constructor(root) {
    this.root = root;
    this.list = [];
    this.history = [];
    this.eventHandlers = [];

    // DOM
    this.listElement = root.querySelector("#list");
    this.deleteBtn = root.querySelector("#delete-btn");
    this.itemInput = root.querySelector("#item-input");
    this.undoBtn = root.querySelector("#undo-btn");
    this.cancelBtn = root.querySelector("#cancel-btn");
    this.openModalBtn = root.querySelector("#open-modal-btn");
    this.modal = root.querySelector("#modal");
    this.modalForm = root.querySelector("#modal-form");

    this.init();
  }

  init() {
    this.bindEvent(this.openModalBtn, "click", this.showModal.bind(this));
    this.bindEvent(this.cancelBtn, "click", this.hideModal.bind(this));
    this.bindEvent(this.undoBtn, "click", this.goToLastState.bind(this));
    this.bindEvent(
      this.deleteBtn,
      "click",
      this.deleteSelectedItems.bind(this)
    );
    this.bindEvent(this.modalForm, "submit", this.handleFormSubmit.bind(this));
    this.bindEvent(this.modal, "click", this.handleModalClick.bind(this));

    this.renderList();
  }

  bindEvent(element, type, handler) {
    if (!element) return;
    element.addEventListener(type, handler);
    this.eventHandlers.push({ element, type, handler });
  }

  unbindEvents() {
    this.eventHandlers.forEach(({ element, type, handler }) => {
      element.removeEventListener(type, handler);
    });
    this.eventHandlers = [];
  }

  renderList() {
    this.listElement.innerHTML = "";

    this.list.forEach((item, index) => {
      const li = document.createElement("li");
      li.className = "card__item";

      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = item.selected;

      const text = document.createElement("span");
      text.textContent = item.label;

      label.appendChild(checkbox);
      label.appendChild(text);
      li.appendChild(label);
      this.listElement.appendChild(li);

      const onCheckboxChange = () => {
        this.list[index].selected = checkbox.checked;
        this.updateDeleteButtonState();
      };

      const onDoubleClick = () => {
        this.saveToHistory();
        this.animateRemoval(li, () => {
          this.list.splice(index, 1);
          this.renderList();
        });
      };

      checkbox.addEventListener("change", onCheckboxChange);
      li.addEventListener("dblclick", onDoubleClick);

      this.eventHandlers.push(
        { element: checkbox, type: "change", handler: onCheckboxChange },
        { element: li, type: "dblclick", handler: onDoubleClick }
      );
    });

    this.updateUndoButtonState();
    this.updateDeleteButtonState();
  }

  addItem(label) {
    this.saveToHistory();
    this.list.push({ label, selected: false });
    this.renderList();
  }

  deleteSelectedItems() {
    this.saveToHistory();
    const itemsToRemove = [];

    [...this.listElement.children].forEach((li, index) => {
      if (this.list[index].selected) {
        this.animateRemoval(li, () => {
          itemsToRemove.push(index);
          if (
            itemsToRemove.length === this.list.filter((i) => i.selected).length
          ) {
            this.list = this.list.filter((item) => !item.selected);
            this.renderList();
          }
        });
      }
    });
  }

  goToLastState() {
    if (this.history.length > 0) {
      this.list = this.history.pop().map((item) => ({ ...item }));
      this.renderList();
    }
  }

  saveToHistory() {
    this.history.push(this.list.map((item) => ({ ...item })));
    this.updateUndoButtonState();
  }

  updateDeleteButtonState() {
    const hasSelected = this.list.some((item) => item.selected);
    this.deleteBtn.disabled = !hasSelected;
  }

  updateUndoButtonState() {
    this.undoBtn.disabled = this.history.length === 0;
  }

  animateRemoval(element, callback) {
    element.classList.add("card__item--removing");
    setTimeout(callback, 400);
  }

  showModal() {
    this.modal.classList.remove("modal--hidden");
    this.itemInput.focus();
  }

  hideModal() {
    this.itemInput.value = "";
    this.modal.classList.add("modal--hidden");
  }

  handleModalClick(event) {
    if (event.target === this.modal) {
      this.hideModal();
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const value = this.itemInput.value.trim();
    if (value) {
      this.addItem(value);
      this.hideModal();
    }
  }

  destroy() {
    this.unbindEvents();
    this.listElement.innerHTML = "";
    this.list = [];
    this.history = [];
  }
}

//_____________________________________________________
// Instancia única
document.addEventListener("DOMContentLoaded", () => {
  const appRoot = document;
  const itemListApp = new ItemListApp(appRoot);

  // Destroy:
  // setTimeout(() => itemListApp.destroy(), 10000);
});
