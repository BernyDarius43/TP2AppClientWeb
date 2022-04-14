<template>
    <div class="container">
        <div class="title has-text-centered">Profile</div>
        <form autocomplete="on">
            <div class="field">
            <div id="divSuccess" v-if="successMessageProfile"
            class="notification is-success is-light">
                {{successMessageProfile}}
            </div>
        </div>
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
                <span class="field-text"></span>
            </p>
        </div>
        <div class="field form-group">
            <p class="control has-icons-left ">
                <input
                id="password"
                v-model="password"
                autocomplete="current-password"
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
            <p class="control has-icons-left errors ? 'is-danger' : ''">
               <input
                id="ConfirmPassword"
                v-model="confirmPassword"
                autocomplete="new-password"
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
                <button class="button is-success" @click.prevent="updateProfile">
                Update Profile
                </button>
                <button class="button is-danger" @click.prevent="deleteProfile"
                style="margin-left: 10px;">
                Delete Profile
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
                {{errors}}
            </div>
        </div>
        </form>
    </div>
</template>

<script>
export default {
  name: 'Profile',
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errors: '',
      successMessageProfile: '',
      url: 'https://tvshowapi.apis.redirectme.net/api/user',
      token: this.$store.state.token,
      bearerToken: '',

    };
  },
  mounted() {
    this.getBearerToken();
  },
  computed: {
    loggedIn() {
      return this.$store.getters.loggedIn;
    },
  },
  methods: {
    async getBearerToken() {
      const url = 'https://tvshowapi.apis.redirectme.net/api/user';
      const { token } = this.$store.state;
      const bearerToken = `bearer ${token}`;

      if (this.loggedIn) {
        const response = await fetch(url,
          {
            method: 'Get',
            headers: {
              Authorization: bearerToken,
              'Content-Type': 'application/json',
            },
          });

        if (response.ok) {
          const data = await response.json();
          this.email = data.Email;
        } else {
          response.text().then((text) => {
            this.errors = Error(text);
          });
        }
      } else {
        this.errors = 'Sorry, it seems that you are not logged in, please log in';
      }
    },
    async updateProfile() {
      const { email, password, confirmPassword } = this;
      this.bearerToken = `bearer ${this.token}`;
      if (this.loggedIn) {
        if (password === confirmPassword) {
          if (password.length && confirmPassword.length >= 5) {
            if (email.length < 30 || email.length > 5) {
              const response = await fetch(this.url, {
                method: 'PUT',
                headers: {
                  Authorization: this.bearerToken,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });

              if (response.ok) {
                this.successMessageProfile = 'Account updated successfully!';
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
          this.errors = 'Sorry, it seems that the passwords do not match, please try again';
          this.password = '';
          this.confirmPassword = '';
        }
      } else {
        this.errors = 'Sorry, it seems that you are not logged in, please log in';
      }
    },
    // Delete the profile
    async deleteProfile() {
      const { email, password, confirmPassword } = this;
      this.bearerToken = `bearer ${this.token}`;

      if (this.loggedIn) {
        if (password === confirmPassword) {
          if (password.length && confirmPassword.length >= 5) {
            if (email.length < 30 && email.length > 5) {
              const response = await fetch(this.url, {
                method: 'DELETE',
                headers: {
                  Authorization: this.bearerToken,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  email,
                  password,
                }),
              });

              if (response.ok) {
                this.successMessageProfile = 'Account deleted successfully!';
                this.$store.dispatch('deleteToken');
                setTimeout(() => {
                  this.$router.push('/');
                }, 1000);
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
          this.errors = 'Sorry, it seems that the passwords do not match, please try again';
          this.password = '';
          this.confirmPassword = '';
        }
      } else {
        this.errors = 'Sorry, it seems that you are not logged in, please log in';
      }
    },
  },
};
</script>
