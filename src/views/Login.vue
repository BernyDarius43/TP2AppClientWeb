<template>
    <div class="container">
      <div class="title has-text-centered">Login</div>
        <form>
          <div id="divSuccess" v-if="successMessage" class="notification is-success is-light">
                {{successMessage}}
            </div>
          <div class="field form-group">
            <p class="control has-icons-left has-icons-right">
                <input
                id="email"
                v-model="email"
                autocomplete="email"
                class="input is-large form-control"
                :class="{'is-danger': errors, '': !errors}"
                ng-class="errors ? 'is-danger' : ''"
                type="email"
                placeholder="Email"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-envelope"></i>
                </span>
            </p>
        </div>
        <div class="field form-group">
            <p class="control has-icons-left ">
                <input
                id="password"
                v-model="password"
                autocomplete="current-password"
                class="input is-large form-control"
                :class="{'is-danger': errors, '': !errors}"
                type="password"
                placeholder="Password"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
            </p>
        </div>
        <div class="field">
            <p class="control ">
                <button class="button is-success" v-on:click="login">
                Login
                </button>
                <router-link to="/">
                <button class="button is-danger" style="margin-left: 10px;">
                Cancel
                </button>
                </router-link>
            </p>
        </div>
        <div class="field">
            <div  id="divError" v-if="errors" class="notification is-danger is-light">
                {{errors}}
            </div>
        </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      errors: '',
      successMessage: this.dataSuccessMessage,
    };
  },
  props: {
    dataSuccessMessage: {
      type: String,
    },
  },
  methods: {
    async login() {
      const { email, password } = this;
      // const inputArr = document.getElementsByClassName('form-control');
      const tokenURL = 'https://tvshowapi.apis.redirectme.net/token';
      const encodedUserName = encodeURIComponent(this.email);
      const encodedPassword = encodeURIComponent(this.password);
      const bodyContent = `grant_type=password&username=${encodedUserName}&password=${encodedPassword}`;

      if (email.length < 30 && email.length > 5) {
        if (password.length >= 5) {
          const response = await fetch(tokenURL, {
            method: 'POST',
            body: bodyContent,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          });

          if (response.ok) {
            const data = await response.json();
            this.$store.dispatch('storeToken', data.access_token);
            this.successMessage = 'You successfully signed in!';
            this.$router.push({ name: 'Home', params: { dataSuccessMessage: this.successMessage } });
          } else {
            response.text().then((text) => {
              this.errors = Error(text.slice(46, -2));
              this.password = '';
            });
            this.successMessage = '';
            // for (let i = 0; i < inputArr.length; i += 1) {
            //   inputArr[i].classList.add('is-danger');
            // }
          }
        } else {
          this.errors = 'Sorry, but the passwords need to have at least 5 character, please try again';
          this.password = '';
          this.confirmPassword = '';
        }
      } else {
        this.errors = 'Sorry, but the email needs to have at least 5 character and a maximum of 30 characteres while having the "@" character., please try again';
        this.password = '';
        this.confirmPassword = '';
      }
    },
  },
};
</script>
