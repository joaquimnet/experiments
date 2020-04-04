new Vue({
  el: "#welcome",
  data: {
    itemsToPickFrom: [],
    pickedItem: undefined,
    inputValue: "",
  },
  methods: {
    removeItem(index) {
      if (Number.isNaN(index)) {
        return;
      }
      if (index < 0 || index > this.itemsToPickFrom.length) {
        return;
      }
      this.itemsToPickFrom = this.itemsToPickFrom.filter((v, i) => i !== index);
      this.afterUpdate();
    },
    addItem(itemToAdd) {
      if (typeof itemToAdd !== "string") {
        return;
      }

      const item = itemToAdd.trim();

      if (!item.length) return;

      this.itemsToPickFrom.push(item);
      this.afterUpdate();
    },
    clearList() {
      while (this.itemsToPickFrom.length) {
        this.removeItem(0);
      }
    },
    pickItem() {
      return this.itemsToPickFrom[
        Math.floor(Math.random() * this.itemsToPickFrom.length)
      ];
    },
    removeItemEvt(index) {
      this.removeItem(Number(index));
    },
    formSubmitEvt(e) {
      e.preventDefault();
      const newItem = this.inputValue;
      this.inputValue = "";
      this.addItem(newItem);
    },
    afterUpdate() {
      localStorage.setItem("itemsList", JSON.stringify(this.itemsToPickFrom));
    },
  },
  created() {
    const stored = localStorage.getItem("itemsList");
    this.itemsToPickFrom = stored ? JSON.parse(stored) : [];

    window.addEventListener("keyup", (e) => {
      if (e.key === "Backspace" && e.ctrlKey) {
        this.clearList();
      }
      if (e.key !== "Enter") {
        return;
      }

      if (e.ctrlKey) {
        this.pickedItem = this.pickItem();
        return;
      }

      this.$refs.input.focus();
    });
  },
});
