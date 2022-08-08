<template>
  <div id="app">
    <div v-if="loggedIn" class="container">
      <div class="ui five item menu">
        <button class="item ui inverted purple button nav-link" @click="puts = 4">Resources</button>
        <button class="item ui inverted blue button" @click="puts = 2">Welcome back, {{ user }}</button>
        <button class="item ui black button" @click="puts = 3">Options History</button>
        <button class="item ui inverted red button nav-link" aria-current="page" @click="puts = 0">Puts</button>
        <button class="item ui inverted green button nav-link" @click="puts = 1">Calls</button>
      </div>
      <div class="container">
        <div v-if="puts === 0">
          <Form :formsType="true"></Form>
        </div>
        <div v-if="puts === 1">
          <Form :formsType="false"></Form>
        </div>
        <div v-if="puts === 2">
          <Profile></Profile>
        </div>
        <div v-if="puts === 3">
          <MyOptions></MyOptions>
        </div>
        <div v-if="puts === 4">
          <Resources></Resources>
        </div>
      </div>
    </div>
    <div v-else>
      <div v-if="loginPage">
        <div class="centerCard ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui teal image header">
              <div class="content">Register an account</div>
            </h2>
            <form id="reg-form" @submit.prevent="submit" class="ui large form">
              <div class="ui stacked segment">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="address card outline icon"></i>
                    <input type="text" id="name" required name="name" placeholder="Your name" autocomplete="off" />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="email" id="username" required name="email" placeholder="E-mail address" autocomplete="off" />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" id="password" required name="password" placeholder="Password" autocomplete="off" />
                  </div>
                </div>
                <div class="ui fluid large teal submit button" @click="registerUser">Register</div>
              </div>
            </form>
            <div v-if="regErrorVisible" class="ui error message">{{ regError }}</div>
            <div class="ui message">
              Already have an account?
              <a
                href="#"
                @click="
                  {
                    loginPage = false;
                  }
                "
                >Login</a
              >
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="centerCard ui middle aligned center aligned grid">
          <div class="column">
            <h2 class="ui teal image header">
              <div class="content">Login to your account</div>
            </h2>
            <form id="login-form" @submit.prevent="submit" class="ui large form">
              <div class="ui stacked segment">
                <div class="field">
                  <div class="ui left icon input">
                    <i class="user icon"></i>
                    <input type="email" id="login-username" required name="email" placeholder="E-mail address" autocomplete="off" />
                  </div>
                </div>
                <div class="field">
                  <div class="ui left icon input">
                    <i class="lock icon"></i>
                    <input type="password" id="login-password" required name="password" placeholder="Password" autocomplete="off" />
                  </div>
                </div>
                <div class="ui fluid large teal submit button" @click="loginUser">Login</div>
              </div>
            </form>
            <div v-if="loginErrorVisible" class="ui error message">{{ loginError }}</div>
            <div class="ui message">
              New to us?
              <a
                href="#"
                @click="
                  {
                    loginPage = true;
                  }
                "
                >Sign Up</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Form from "./components/Form.vue";
  import Profile from "./components/Profile.vue";
  import MyOptions from "./components/MyOptions.vue";
  import Resources from "./components/Resources.vue";

  export default {
    name: "App",
    components: {
      Form,
      Profile,
      MyOptions,
      Resources,
    },
    data() {
      return {
        user: "",
        loggedIn: false,
        loginPage: false,
        puts: 0,
        loginError: "",
        loginErrorVisible: false,
        regError: "",
        regErrorVisible: false,
      };
    },

    methods: {
      async changePassword() {
        const password = document.getElementById("change-password").value;

        const result = await fetch("http://localhost:3002/api/change-password/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newpassword: password,
            token: localStorage.getItem("token"),
          }),
        }).then((res) => res.json());

        if (result.status === "ok") {
          console.log("Got the token: ", result.data);
          localStorage.setItem("token", result.data);
          alert("Success");
        } else {
          alert(result.error);
        }
      },
      async registerUser() {
        const name = document.getElementById("name").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        const result = await fetch("http://localhost:3002/api/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            username,
            password,
          }),
        }).then((res) => res.json());

        if (result.status === "ok") {
          // everythign went fine
          localStorage.setItem("name", name);
          this.user = name;
          this.loggedIn = true;
          this.regError = "";
          this.regErrorVisible = false;
        } else {
          console.log("error", result.error);
          this.regErrorVisible = true;
          this.regError = result.error;
        }
      },
      async loginUser() {
        const username = document.getElementById("login-username").value;
        const password = document.getElementById("login-password").value;

        const result = await fetch("http://localhost:3002/api/login", {
          // const result = await fetch("localhost:3002/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }).then((res) => res.json());

        if (result.status === "ok") {
          // everythign went fine
          this.getUsersName(result.id);
          localStorage.setItem("token", result.data);
          localStorage.setItem("id", result.id);
          this.loggedIn = true;
          this.loginError = "";
          this.loginErrorVisible = false;
          // this.getUsersName(username);
          console.log("id: ", result.id);
        } else {
          console.log("error", result.error);
          this.loginErrorVisible = true;
          this.loginError = result.error;
        }
      },
      async getUsersName(id) {
        const result = await fetch("http://localhost:3002/api/usersName/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }).then((res) => res.json());

        if (result.status === "ok") {
          console.log("success", result);
          localStorage.setItem("name", result.data.name);
          console.log("name", result.data.name);
          this.user = result.data.name;
        } else {
          console.log("error", result.error);
          this.loginError = result.error;
        }
      },
    },
  };
</script>

<style>
  .centerCard {
    /* margin: 0; */
    position: absolute;
    top: 50%;
    left: 40%;
    -ms-transform: translateY(-50%);
    transform: translateY(-50%);
  }
</style>
