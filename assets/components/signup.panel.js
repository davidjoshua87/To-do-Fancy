Vue.component('SignupPanel', {
  template: `
  <div class="container signin animated fadeIn">
    <div class="row">
      <div class="col-10 mx-auto">
        <div class="panel panel-default">
          <div class="panel-heading">
            <div class="row">
              <h1 class="panel-title mx-auto">Sign Up</h1>
            </div>
            <br>
          </div>
          <div class="panel-body">
              <fieldset>
                <div class="form-group">
                  <input class="form-control" placeholder="Name" name="name" type="text" v-model="usersignup.name">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Username" name="username" type="text" v-model="usersignup.username">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="E-mail" name="email" type="text" v-model="usersignup.email">
                </div>
                <div class="form-group">
                  <input class="form-control" placeholder="Password" name="password" type="password" v-model="usersignup.password">
                </div>
                <input class="submit button-signin btn-block" type="submit" value="Sign Up" @click="signup">
              </fieldset>
            <input @click='defaultpanel' class="back" type="submit" value="Back">
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  props: ['usersignup'],
  data: function () {
    return {}
  },
  methods: {
    defaultpanel: function () {
      this.$emit('defaultpanel')
    },
    signup: function () {
      this.$emit('signup');
    }
  }
})
