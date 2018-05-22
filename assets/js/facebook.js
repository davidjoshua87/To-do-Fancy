function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  if(response.status === 'connected') {
    console.log("send to server")
    console.log(`Auth Token: ${response.authResponse.accessToken}`)
    axios({
        method: 'post',
        url: 'https://mysterious-tundra-15681.herokuapp.com/api/users/signinfb',
        headers: {
          token_fb: response.authResponse.accessToken
        }
      })
      .then(data => {
        console.log(`response login fb: ${JSON.stringify(data)}`);
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('id', data.data._id);
        localStorage.setItem('name', data.data.name);
        localStorage.setItem('email', data.data.email);
      })
      .catch(err => {
        console.log('login failed');
      })
  } else {
    console.log('not connected')
  }
}

// Funtion executed when someone finished the login
function checkLoginState() {
  console.log('masuk checkloginstate')
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

function logout() {
  FB.getLoginStatus(function (response) {
    if(response.status === 'connected') {
      FB.logout(function (response) {
        console.log('logout facebook')
        console.log(response)
      })
    }
  })
  localStorage.removeItem('token');
  localStorage.removeItem('id');
  localStorage.removeItem('name');
  localStorage.removeItem('email');
  location.reload();
}

function loginfb() {
  FB.login(response => {
    if(response.authResponse) {
      console.log('ini auth response')
      console.log(response.authResponse)
      console.log('Welcome! Fecthing you information..')
      $http({
          method: 'post',
          url: '/users/signinfb',
          headers: {
            token_fb: response.authResponse.accessToken
          }
        })
        .then(data => {
          console.log(`response login fb: ${JSON.stringify(data)}`);
          localStorage.setItem('token', data.data.token);
          localStorage.setItem('id', data.data._id);
          localStorage.setItem('name', data.data.name);
          localStorage.setItem('email', data.data.email);
          location.reload();
        })
        .catch(err => {
          console.log('login failed');
        })
    }
  })
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '377662989307557',
    cookie: true,

    xfbml: true,
    version: 'v3.0'
  });

  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });

};

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if(d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.12&appId=377662989307557&autoLogAppEvents=1';
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
