const $axios = axios.create({
  baseURL: 'https://mysterious-tundra-15681.herokuapp.com/api'
})

function buttonPush() {
  console.log('button pushed')
}

window.onload = function () {
  var app = new Vue({
    el: '#app',
    data: {
      userData: {
        id: localStorage.getItem('id'),
        name: localStorage.getItem('name'),
        token: localStorage.getItem('token'),
        email: localStorage.getItem('email')
      },
      todos: [],
      newTodo: "",
      visibility: 'all',
      editedTodo: null,
      editCache: '',
      newTags: [],
      weather: {},
      loginState: 'default',
      userLogin: {
        identity: '',
        password: ''
      },
      userCreate: {
        name: '',
        password: '',
        email: '',
        username: ''
      }
    },
    methods: {
      login: function () {
        $axios({
            method: 'post',
            url: '/users/signin',
            data: {
              username: this.userLogin.identity,
              email: this.userLogin.email,
              password: this.userLogin.password
            }
          })
          .then(response => {
            // console.log(`Response Login : ${JSON.stringify(response)}`);
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('id', response.data.data.id);
            localStorage.setItem('name', response.data.data.name);
            localStorage.setItem('email', response.data.data.email);
            this.userLogin.identity = '';
            this.userLogin.password = '';
            location.reload();
          })
          .catch(response => {
            this.userLogin.identity = '';
            this.userLogin.password = '';
            swal({
              title: "Wrong email/username/password!",
              text: "Please Sign up first if you don't have account",
              icon: "error",
            });
          })
      },
      signup: function () {
        $axios({
            method: 'post',
            url: '/users/signup',
            data: {
              username: this.userCreate.username,
              email: this.userCreate.email,
              password: this.userCreate.password,
              name: this.userCreate.name
            }
          })
          .then(response => {
            // console.log(`Response Signup : ${JSON.stringify(response)}`);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('name', response.data.name);
            localStorage.setItem('id', response.data.id);
            localStorage.setItem('email', response.data.email);
            this.userCreate.name = '';
            this.userCreate.password = '';
            this.userCreate.username = '';
            this.userCreate.email = '';
            location.reload();
          })
          .catch(response => {
            this.userCreate.name = '';
            this.userCreate.password = '';
            this.userCreate.username = '';
            this.userCreate.email = '';
            swal({
              title: "Email/Username already registered!",
              text: "Please login if you already have account or sign up if you don't have account",
              icon: "error",
            });
          })
      },
      logout: function () {
        FB.logout(function (response) {
          console.log('Logout from facebook')
          statusChangeCallback(response)
        })
        localStorage.removeItem('token');
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
      },
      addTodo: function () {
        let value = this.newTodo && this.newTodo.trim();
        if(!value)
          return
        $axios({
            method: 'post',
            url: `/todos/user/${this.userData.id}`,
            data: {
              text: value,
              userId: this.userData.id,
            },
            headers: {
              token: this.userData.token,
            }
          })
          .then(data => {
            this.loadTodo();
            this.newTodo = '';
          })
          .catch(err => {
            console.log(`${JSON.stringify(err.response)}`)
          })
      },
      nextInput: function () {
        document.getElementById('tags').focus();
      },
      statusToggle: function (todo) {
        $axios({
            method: 'put',
            url: `/todos/${todo._id}`,
            data: {
              status: todo.status,
            },
            headers: {
              token: this.userData.token,
            }
          })
          .then(data => {
            console.log('succeed udpate')
            this.loadTodo();
          })
          .catch(err => {
            console.log(`${JSON.stringify(err.response)}`)
          })
      },
      deleteTodo: function (todo) {
        $axios({
            method: 'delete',
            url: `/todos/${todo._id}`,
            headers: {
              token: this.userData.token,
            }
          })
          .then(() => {
            this.loadTodo();
          })
          .catch(err => {
            console.log(`${JSON.stringify(err.response)}`)
          })
      },
      editTodo: function (todo) {
        this.editCache = todo.text;
        this.editedTodo = todo;
      },
      doneEdit: function (todo) {
        if(!this.editedTodo) {
          return
        }
        this.editedTodo = null;
        todo.text = todo.text.trim();
        if(!todo.text) {
          this.deleteTodo(todo);
        } else {
          $axios({
              method: 'put',
              url: `/todos/${todo._id}`,
              data: {
                text: todo.text,
              },
              headers: {
                token: this.userData.token,
              }
            })
            .then(data => {
              console.log('succeed udpate')
              this.loadTodo();
            })
            .catch(err => {
              console.log(`${JSON.stringify(err.response)}`)
            })
        }
      },
      cancelEdit: function (todo) {
        this.editedTodo = null;
        todo.text = this.editCache;
      },
      loadTodo: function () {
        $axios({
            method: 'get',
            url: `/todos/user/${this.userData.id}`,
            headers: {
              token: this.userData.token
            }
          })
          .then(response => {
            this.todos = response.data.data.map(val => val);
            console.log(`ini list todo ${this.todos}`);
          })
          .catch(err => {
            console.log(`${JSON.stringify(err.response)}`)
          })
      },
      selectCategory: function (condition) {
        switch(condition) {
        case 'all':
          this.visibility = 'all'
          break;
        case 'active':
          this.visibility = 'active'
          break;
        case 'completed':
          this.visibility = 'completed'
          break;
        case 'important':
          this.visibility = 'important'
          break;
        }
      },
      completeAll: function () {
        this.todos.forEach(todo => {
          todo.status = true;
          this.statusToggle(todo);
        })
      },
      deleteAll: function () {
        this.todos.forEach(todo => {
          this.deleteTodo(todo);
        })
      },
      clearComplete: function () {
        this.todos.forEach(todo => {
          if(todo.status == true) {
            this.deleteTodo(todo);
          }
        })
      },
      toggleLoginState: function (state) {
        this.loginState = state;
      },
      loginfb() {
        checkLoginState();
      }
    },
    computed: {
      filteredTodos: function () {
        switch(this.visibility) {
        case 'all':
          return this.todos;
          break;
        case 'active':
          return this.todos.filter(todo => {
            return !todo.status;
          })
          break;
        case 'completed':
          return this.todos.filter(todo => {
            return todo.status;
          })
          break;
        case 'important':
          return this.todos.filter(todo => {
            return todo.starred;
          })
          break;
        }
      },
      uncompletedTodo: function () {
        let count = 0;
        this.todos.forEach(todo => {
          if(todo.status == false)
            count++;
        });
        return count;
      },
      checkCompleted: function () {
        let count = 0;
        this.todos.forEach(todo => {
          if(todo.status == true)
            count++;
        });
        return count;
      },
      firstName: function () {
        return this.userData.name.split(' ')[0];
      }
    },
    directives: {
      'focus': function (el, binding) {
        if(binding.value) {
          el.focus()
        }
      },
    },
    created: function () {
      if(this.userData.token !== null) {
        this.loadTodo();
      }
      axios({
        method: 'get',
        url: 'https://api.apixu.com/v1/current.json?key=f89d00a4e07547eeacd130654181605&q=Jakarta',
      }).then(data => {
        this.weather = {
          icon: data.data.current.condition.icon,
          text: data.data.current.condition.text,
        }
      })
    },
  })
}
