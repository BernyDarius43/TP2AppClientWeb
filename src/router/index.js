import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';
import store from '@/store/index';
import About from '@/views/About.vue';
import Login from '@/views/Login.vue';
import DetailsTvShow from '@/views/DetailsTvShow.vue';
import SignUp from '@/views/SignUp.vue';
import Profile from '@/views/Profile.vue';
import FavoriteTvShows from '@/views/FavoriteTvShows.vue';
import Episodes from '@/views/Episodes.vue';
import DetailsEpisode from '@/views/DetailsEpisode.vue';
import ViewEpisode from '@/views/ViewEpisode.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    props: true,
  },
  {
    path: '/DetailsTvShow/:TvShowId',
    name: 'DetailsTvShow',
    component: DetailsTvShow,
    props: true,
  },
  {
    path: '/Login',
    name: 'Login',
    component: Login,
    props: true,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/About',
    name: 'About',
    component: About,
  },
  {
    path: '/SignUp',
    name: 'SignUp',
    component: SignUp,
    meta: {
      requiresVisitor: true,
    },
  },
  {
    path: '/Profile',
    name: 'Profile',
    component: Profile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/FavoriteTvShows',
    name: 'FavoriteTvShows',
    component: FavoriteTvShows,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/Episodes/:SeasonId',
    name: 'Episodes',
    component: Episodes,
    props: true,
  },
  {
    path: '/DetailsEpisode/:EpisodeId',
    name: 'DetailsEpisode',
    component: DetailsEpisode,
    props: true,
  },
  {
    path: '/ViewEpisode/:EpisodeId',
    name: 'ViewEpisode',
    component: ViewEpisode,
    props: true,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to Home page.
    if (!store.getters.loggedIn) {
      // this route requires auth, check if logged in
      // if not, redirect to Login page.
      if (to.name === 'FavoriteTvShows') {
        next({
          path: '/Login',
        });
      } else {
        next({
          path: '/',
        });
      }
    } else {
      next();
    }
  } else if (to.matched.some((record) => record.meta.requiresVisitor)) {
    // this route requires auth, check if logged in
    // if not, redirect to Home page.
    if (store.getters.loggedIn) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();// make sure to always call next()!
  }
});

export default router;
