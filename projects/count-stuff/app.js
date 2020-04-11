new Vue({
  el: '.page',
  data: {
    items: [],
    pickedItem: undefined,
    inputValue: '',
  },
  computed: {
    total() {
      return this.items
        .map(item => item.count)
        .reduce((acc, cur) => acc + cur, 0);
    },
  },
  methods: {
    removeItem(index) {
      if (Number.isNaN(index)) {
        return;
      }
      if (index < 0 || index > this.items.length) {
        return;
      }
      this.items = this.items.filter((v, i) => i !== index);
      this.afterUpdate();
    },
    addItem(itemToAdd) {
      const item = { name: itemToAdd.trim(), count: 0 };

      this.items.push(item);
      this.afterUpdate();
    },
    clearList() {
      while (this.items.length) {
        this.removeItem(0);
      }
    },
    increase(index) {
      this.items[index].count += 1;
      this.afterUpdate();
    },
    decrease(index) {
      this.items[index].count -= 1;
      this.afterUpdate();
    },
    removeItemEvt(index) {
      this.removeItem(Number(index));
    },
    formSubmitEvt(e) {
      if (!this.inputValue.length) return;
      const newItem = this.inputValue;
      this.inputValue = '';
      this.addItem(newItem);
    },
    afterUpdate() {
      localStorage.setItem('itemCounterList', JSON.stringify(this.items));
    },
  },
  created() {
    const stored = localStorage.getItem('itemCounterList');
    this.items = stored ? JSON.parse(stored) : [];

    window.addEventListener('keyup', e => {
      if (e.key === 'Backspace' && e.ctrlKey) {
        this.clearList();
      }
      if (e.key !== 'Enter') {
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
