<template>
  <div class="auth-layout row align-content--center">
    <div class="flex xs12 pa-3 flex-center">
      <router-link class="py-5 flex-center" to="/">
        <va-icon-vuestic />
      </router-link>
    </div>

    <div class="flex xs12 pa-3">
      <div class="d-flex justify--center">
        <va-card class="auth-layout__card">
          <va-tabs
            v-model="tabIndex"
            center
          >
            <va-tab>{{ $t('auth.login') }}</va-tab>
            <va-tab>{{ $t('auth.createNewAccount') }}</va-tab>
          </va-tabs>

          <va-separator/>

          <div class="pa-3">
            <router-view/>
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
import VaIconVuestic from '../../iconset/VaIconVuestic'
import { originalTheme, corporateTheme } from 'vuestic-ui/src/services/themes'
import {
  ColorThemeActionsMixin,
  ColorThemeMixin,
} from '../../services/vuestic-ui'

const tabs = [
  'login',
  'signup',
]

export default {
  name: 'AuthLayout',
  components: { VaIconVuestic },
  data () {
    return {
      selectedTabIndex: 0,
      tabTitles: ['login', 'createNewAccount'],
    }
  },
  inject: ['contextConfig'],
  mixins: [ColorThemeActionsMixin, ColorThemeMixin],
  created () {
    const theme = corporateTheme
    this.setColors(theme.colors)
    Object.keys(theme.context).forEach((key) => {
      this.contextConfig[key] = theme.context[key]
    })
    this.$root.$on('change-theme', this.setTheme)
  },
  beforeDestroy () {
    this.$root.$off('change-theme', this.setTheme)
  },
  methods: {
    setTheme (themeName) {
      const theme = themeName === 'corporate' ? corporateTheme : originalTheme
      this.setColors(theme.colors)
      Object.keys(theme.context).forEach((key) => {
        this.contextConfig[key] = theme.context[key]
      })
    },
  },
  computed: {
    tabIndex: {
      set (tabIndex) {
        this.$router.push({ name: tabs[tabIndex] })
      },
      get () {
        return tabs.indexOf(this.$route.name)
      },
    },
  },
}
</script>

<style lang="scss">
.auth-layout {
  min-height: 100vh;
  background-image: linear-gradient(to right, #eeeeee, #eeeeee);

  &__card {
    width: 100%;
    max-width: 600px;
  }

  &__options {
    @include media-breakpoint-down(xs) {
      flex-direction: column;
    }
  }
}
</style>
