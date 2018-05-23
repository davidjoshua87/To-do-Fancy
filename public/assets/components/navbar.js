Vue.component('Navbar', {
  template: `
    <nav class="navbar navbar-expand-lg animated fadeInDown">
      <span class="navbar-brand" href="/">to-do</span>
        <ul class="navbar-nav mr-auto">
        </ul>
        <span class="navbar-text">
          <a  v-if="userdata.token!==null" onclick="logout()" class="logout" >Logout</a>
        </span>
    </nav>
  `,
  props: ['userdata'],
  data: function () {
    return {}
  },
  methods: {
    logout: function () {
      this.$emit('logout');
    }
  }
})
