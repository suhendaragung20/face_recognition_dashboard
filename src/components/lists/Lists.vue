<template>
  <div class="lists">
    <div class="row">
      <div class="flex xs12 lg7">
        <va-card
          overlay
          titleOnImage
          :image="$t(vids)"
          :title="$t('Capturing...')"
        >
          <va-button v-on:click="start_capture"> {{ $t('Collect') }}</va-button>
          <va-button outline v-on:click="stop_capture"> {{ $t('Stop') }}</va-button>
        </va-card>
      </div>

      <div class="flex xs12 lg5">
        <va-list fit class="mb-2">
          <va-list-label>
            {{ $t('Profil') }}
          </va-list-label>

          <va-item clickable>
            <va-item-section>
              <va-item-label>
                Nama
              </va-item-label>
              <va-item-label caption>
                Agung Suhendar
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item clickable>
            <va-item-section>
              <va-item-label>
                Email
              </va-item-label>

              <va-item-label caption>
                suhendaragung20@gmail.com
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item clickable>
            <va-item-section>
              <va-item-label>
                Alamat
              </va-item-label>

              <va-item-label caption>
                Sumedang Selatan
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item>
            <va-button small outline icon-right="glyphicon glyphicon-pencil"> {{ $t('Ganti Siswa') }}</va-button>
          </va-item>
          <va-list-separator fit spaced />

          <va-list-label>
            {{ $t('Pilih Kelas') }}
          </va-list-label>

          <va-item>
            <va-item-section side>
              <va-checkbox v-model="appBanners" />
            </va-item-section>

            <va-item-section>
              <va-item-label>
                Kelas X
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item>
            <va-item-section side>
              <va-checkbox v-model="banners" />
            </va-item-section>

            <va-item-section>
              <va-item-label>
                Kelas XI
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item>
            <va-item-section side>
              <va-checkbox v-model="notifications" />
            </va-item-section>

            <va-item-section>
              <va-item-label>
                Kelas XII
              </va-item-label>
            </va-item-section>
          </va-item>
        </va-list>
      </div>
    </div>

    <div class="row">
      <div class="flex xs12 lg12">
        <div class="row">
          <div class="flex xs3 lg2">
            <va-card
              overlay
              titleOnImage
              :image="$t('http://localhost:8000/media/img_capture/'+data_image[0].filename)"
              :title="$t('Cap1')"
            >
            </va-card>
          </div>
          <div class="flex xs3 lg2">
            <va-card
              overlay
              titleOnImage
              :image="$t('http://localhost:8000/media/img_capture/'+data_image[1].filename)"
              :title="$t('Cap1')"
            >
            </va-card>
          </div>
          <div class="flex xs3 lg2">
            <va-card
              overlay
              titleOnImage
              :image="$t('http://localhost:8000/media/img_capture/'+data_image[2].filename)"
              :title="$t('Cap1')"
            >
            </va-card>
          </div>
          <div class="flex xs3 lg2">
            <va-card
              overlay
              titleOnImage
              :image="$t('http://localhost:8000/media/img_capture/'+data_image[3].filename)"
              :title="$t('Cap1')"
            >
            </va-card>
          </div>
          <div class="flex xs3 lg2">
            <va-card
              overlay
              titleOnImage
              :image="$t('http://localhost:8000/media/img_capture/'+data_image[4].filename)"
              :title="$t('Cap1')"
            >
            </va-card>
          </div>
          <div class="flex xs3 lg2">
            <va-card
              overlay
              titleOnImage
              :image="$t('http://localhost:8000/media/img_capture/'+data_image[5].filename)"
              :title="$t('Cap1')"
            >
            </va-card>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import data from './data.json'
import axios from 'axios'

export default {
  data () {
    return {
      customers: data.slice(0, 5),
      archived: data.slice(5, 8),
      appBanners: false,
      banners: false,
      notifications: true,
      vids: 'http://localhost:5000/video_feed',
      data_image: [],
      polling: null,
    }
  },
  async created () {
    this.getImageCapture()
    this.polling = setInterval(() => this.getImageCapture(), 1000)
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
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
    start_capture: function (event) {
      const URL = 'http://127.0.0.1:8000/start_capture/api/'
      this.vids = 'http://localhost:5000/video_feed'
      axios.get(URL)
    },
    stop_capture: function (event) {
      const URL = 'http://127.0.0.1:8000/stop_capture/api/'
      this.vids = 'http://localhost:5000/video_feed'
      axios.get(URL)
    },
    async getImageCapture () {
      try {
        // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
        // const URL = 'https://391d10e67ebf.ngrok.io/test/api/'
        // const res = await axios.get(PROXY_URL + URL)

        const URL = 'http://127.0.0.1:8000/get_captured/api/'
        const res = await axios.get(URL)

        this.data_image = res.data
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>
