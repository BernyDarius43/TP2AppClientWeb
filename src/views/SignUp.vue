<template>
    <div class="container">
        <div class="title has-text-centered">Sign Up</div>
        <form id="sign-upForm" @submit.prevent="signUp">

          <div class="field form-group">
            <p class="control has-icons-left has-icons-right">
                <input
                id="email"
                v-model="email"
                autocomplete="email"
                class="input is-large form-control"
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
                autocomplete="password"
                class="input is-large form-control"
                type="password"
                placeholder="Password"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span class="field-text"></span>
            </p>
        </div>
        <div class="field form-group">
            <p class="control has-icons-left ">
                <input
                id="ConfirmPassword"
                v-model="confirmPassword"
                autocomplete="password"
                class="input is-large form-control"
                type="password"
                placeholder="Confirm password"
                />
                <span class="icon is-small is-left">
                    <i class="fas fa-lock"></i>
                </span>
                <span class="field-text"></span>
            </p>
        </div>
        <div class="field">
            <p class="control ">
                <button class="button is-success" type="submit">
                Sign Up
                </button>
                <router-link to="/">
                <button class="button is-danger" style="margin-left: 10px;">
                Cancel
                </button>
                </router-link>
            </p>
        </div>
        <div class="field">
            <div id="divError" v-if="errors" class="notification is-danger is-light">
            {{ errors }}
            </div>
        </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'SignUp',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errors: '',
      successMessage: '',

    };
  },
  methods: {
    async signUp() {
      const { email, password, confirmPassword } = this;

      if (password === confirmPassword) {
        if (password.length && confirmPassword.length >= 5) {
          if (email.length < 30 && email.length > 5) {
            const response = await fetch('https://tvshowapi.apis.redirectme.net/api/user',
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });

            if (response.ok) {
              this.successMessage = 'Account created successfully!';
              this.$router.push({ name: 'Login', params: { dataSuccessMessage: this.successMessage } });
            } else {
              response.text().then((text) => {
                this.errors = Error(text);
                this.password = '';
                this.confirmPassword = '';
              });
            }
          } else {
            this.errors = 'Sorry, but the email needs to have at least 5 character and a maximum of 30 characteres while having the "@" character., please try again';
            this.password = '';
            this.confirmPassword = '';
          }
        } else {
          this.errors = 'Sorry, but the passwords need to have at least 5 character, please try again';
          this.password = '';
          this.confirmPassword = '';
        }
      } else {
        this.errors = 'Passwords do not match, please try again';
      }
    },
  },
};
</script>
