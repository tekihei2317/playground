new Vue({
  el: '#app',
  data: {
    isShow: false,
    message: 'Hello, world!',
  },
  beforeCreate() {
    console.log('before create');
    console.log(document.querySelector('#app'));
    console.log({ message: this.message });
    console.log('-----');
  },
  created() {
    console.log('created');
    console.log(document.querySelector('#app'));
    console.log({ message: this.message });
    console.log('-----');
  },
  mounted() {
    console.log('mounted');
    console.log(document.querySelector('#app'));
    console.log({ message: this.message });
    console.log('-----');
  },

  methods: {
    showEl() {
      console.log(this.$el);
    },
    updateEl() {
      // $elはマウントしている要素なので、直接変更することもできる
      this.$el.innerHTML = '<h1>Hello, vue!</h1>';
    },
  },
});
