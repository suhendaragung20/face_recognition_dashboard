<template>
  <div class="cards">
    <div class="cards-container row d-flex wrap align--start">
      <!-- eslint-disable vue/valid-v-for -->

      <div class="row">

        <div class="flex xs12 sm7" :key="loop + '-6'">
          <va-card
            overlay
            titleOnImage
            image="http://localhost:5000/video_feed"
            :title="$t('Detection On')"
          >
            {{ $t('Lokasi A') }}
          </va-card>
        </div>

        <div class="flex xs12 sm5">
          <va-list fit class="mb-2">
            <va-list-label>
              {{ $t('Siswa Terdeteksi') }}
            </va-list-label>

            <template v-for="(customer, i) in customers">
              <va-item :key="'item' + customer.id" clickable @click="notify(customer.name)">
                <va-item-section avatar>
                  <va-avatar>
                    <img :src="customer.picture" :alt="customer.name">
                  </va-avatar>
                </va-item-section>

                <va-item-section>
                  <va-item-label>
                    {{ customer.name }}
                  </va-item-label>

                  <va-item-label caption>
                    {{ customer.address }}
                  </va-item-label>
                </va-item-section>

                <va-item-section side>
                  <va-icon name="fa fa-eye" color="gray" />
                </va-item-section>
              </va-item>

              <va-list-separator v-if="i < customers.length - 1" :key="'separator' + customer.id" />
            </template>
          </va-list>

        </div>

      </div>

    </div>

  </div>
</template>

<script>

// import data from '../lists/data.json'
import axios from 'axios'

export default {
  name: 'cards',
  data () {
    return {
      listLoops: 1,
      counter: 1,
      isLoading: false,
      customers: [],
      archived: [],
      appBanners: false,
      banners: false,
      notifications: true,
    }
  },
  async created () {
    this.getLogSiswa()
    setInterval(() => this.getLogSiswa(), 5000)
  },
  methods: {
    addCards () {
      this.isLoading = true
      setTimeout(() => {
        this.isLoading = false
        ++this.listLoops
      }, 1000)
    },
    getGenderIcon (gender) {
      return gender === 'male' ? 'fa fa-mars' : 'fa fa-venus'
    },
    getGenderColor (gender) {
      return gender === 'male' ? 'blue' : 'pink'
    },
    notify (name) {
      this.showToast(`Clicked ${name}`, {
        position: 'bottom-right',
      })
    },
    toggleStar (customer) {
      customer.starred = !customer.starred
    },
    async getLogSiswa () {
      try {
        // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
        // const URL = 'https://391d10e67ebf.ngrok.io/test/api/'
        // const res = await axios.get(PROXY_URL + URL)

        const URL = 'http://127.0.0.1:8000/test/api/'
        const res = await axios.get(URL)

        this.customers = res.data
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style lang="scss">
.cards-container {
  .va-card {
    margin: 0;
  }
}
</style>
