Vue.component('LoginPanel', {
  template: `
  <div class="container signin animated fadeIn">
    <div class="row">
      <div class="col-10 mx-auto">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="row">
              <h1 class="panel-title mx-auto">Sign In</h1>
            </div>
            <br>
          </div>
          <div class="panel-body">
              <fieldset>
                <div class="form-group">
                  <input class="form-control" placeholder="Username" name="email" type="text" v-model="userlogin.identity">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" name="password" type="password" v-model="userlogin.password">
                </div>
                <input class="submit button-signin btn-block" type="submit" value="Login" @click="login">
              </fieldset>
            <input @click='defaultpanel' class="back" type="submit" value="Back">
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['userlogin'],
  data: function () {
    return {

    }
  },
  methods: {
    defaultpanel: function () {
      this.$emit('defaultpanel')
    },
    login: function () {
      this.$emit('login');
    }
  }
})
