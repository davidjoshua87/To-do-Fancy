Vue.component('DefaultPanel', {
  template: `
  <div class="container signin animated fadeIn">
    <div class="row">
      <div class="col-10 mx-auto">
        <div class="panel panel-default">
          <div class="choose-signin">
            <input @click="login" class="button-signin btn-block" type="submit" value="Sign In">
            <input @click="signup" class="button-signin btn-block" type="submit" value="Sign Up">
            <button class='button-facebook btn-block' scope="public_profile,email" onclick='loginfb();'>Login with Facebook</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data: function () {
    return {}
  },
  methods: {
    login: function () {
      this.$emit('loginpanel');
    },
    signup: function () {
      this.$emit('signuppanel');
    },
    loginfb: function () {
      this.$emit('loginfb');
    }
  }
})
