<template>
  <div class="lists">
    <div class="row">
      <div class="flex xs12 lg7">
        <va-card
          square
          titleOnImage
          :image="$t(vids)"
          :title="$t('Capturing...')"
        >
          <va-button small v-on:click="start_capture"> {{ $t('Collect') }}</va-button>
          <va-button small outline v-on:click="stop_capture"> {{ $t('Stop') }}</va-button>
        </va-card>
      </div>

      <div class="flex xs12 lg5">
        <va-list fit class="mb-0">

          <va-item clickable>
            <va-item-section>
              <va-item-label>
                NISN
              </va-item-label>
              <va-item-label caption>
                {{ display_nisn }}
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item clickable>
            <va-item-section>
              <va-item-label>
                Nama
              </va-item-label>

              <va-item-label caption>
                {{ display_nama }}
              </va-item-label>
            </va-item-section>
          </va-item>

          <va-item>
            <va-button small outline icon-right="glyphicon glyphicon-pencil" @click="showLargeModal = true">{{ $t('Ganti Siswa') }}</va-button>
          </va-item>
          <va-list-separator fit spaced />

          <va-modal
            v-model="showLargeModal"
            size="large"
            :title=" $t('Cari Siswa') "
            :message=" $t('Input Nomor Induk Siswa sejumlah 5 digit') "
            :okText=null
            :cancelText=null>
            <div class="align--center">
              <va-input v-model="input_nisn" placeholder="Input NISN" />
              <va-button outline @click="setCurrentSiswaCancel">{{ $t('Cancel') }}</va-button>
              <va-button @click="setCurrentSiswa">{{ $t('Confirm') }}</va-button>
            </div>
          </va-modal>

          <va-list-label>
            {{ $t('Parameter') }}
          </va-list-label>

          <va-item>
            <fieldset>
              <va-toggle
                small
                v-model="toggles.line"
                label="Display Line"
              />
            </fieldset>
          </va-item>

          <va-item>
            <fieldset>
              <va-toggle
                small
                v-model="toggles.conf"
                label="Display Confidence"
              />
            </fieldset>
          </va-item>

          <va-item>
            <div class="flex xs36 lg8 x36 mb-0">
              <div
                class="title mb-0"
                :style="{color: this.$themes.primary}"
              >{{$t('Threshold Detector')}}</div>
              <va-slider
                value-visible
                v-model="value"
              />
            </div>
          </va-item>

        </va-list>

      </div>
    </div>

    <div class="row" v-if="!isHidden">
      <div class="flex xs12 lg12">
        <div class="d-flex justify--start">
          <va-button @click="showAll" small outline>{{ $t('Show All') }}</va-button>
        </div>
        <div class="row">
          <template v-for="(d_image, i) in data_image">
            <div class="flex xs3 lg2" :key="'item' + i">
              <va-card
                square
                titleOnImage
                :image="$t('http://localhost:8000/media/img_capture/'+d_image.filename)"
                :title="$t('Cap1')"
              >
              </va-card>
            </div>
          </template>
        </div>
      </div>
    </div>

    <va-modal
      v-model="showDelete"
      size="large"
      :title=null
      :message=" $t('Hapus Data?') "
      :okText=" $t('Confirm') "
      :cancelText=" $t('Cancel') ">
    </va-modal>

    <div class="row" v-if="isHidden">
      <div class="flex xs12">
        <va-card>
          <div class="d-flex justify--start">
            <va-button @click="isHidden = false" small outline>{{ $t('Hide') }}</va-button>
          </div>
          <div  class="row row-equal">
            <template v-for="(d_image, i) in data_image_total">
              <div class="flex xs2" :key="'item' + i">
                <va-card
                  square
                  titleOnImage
                  :image="$t('http://localhost:8000/media/img_capture/'+d_image.filename)"
                  :title="$t('Cap1')"
                >
                  <va-button small outline icon-right="entypo entypo-trash" @click="showDelete = true">{{ $t('') }}</va-button>
                </va-card>
              </div>
            </template>
          </div>
        </va-card>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'modals',
  data () {
    return {
      appBanners: false,
      banners: false,
      notifications: true,
      vids: 'http://localhost:5000/video_feed',
      data_image: [],
      data_image_total: [],
      polling: null,
      polling_2: null,
      showLargeModal: false,
      showDelete: false,
      value: 50,
      value2: [20, 60],
      toggles: {
        line: true,
        conf: false,
        disabled: true,
        small: false,
        large: false,
      },
      isHidden: false,
      output: '',
      input_nisn: '',
      display_nisn: '12345',
      display_nama: 'Agung Suhendar',
    }
  },
  async created () {
    this.getImageCapture()
    this.polling = setInterval(() => this.getImageCapture(), 1000)
    this.polling_2 = setInterval(() => this.updateParameterDetector(), 1000)
  },
  beforeDestroy () {
    clearInterval(this.polling)
    clearInterval(this.polling_2)
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
    async updateParameterDetector () {
      const formData = new FormData()
      formData.append('display_line', this.toggles.line ? 1 : 0)
      formData.append('display_conf', this.toggles.conf ? 1 : 0)
      formData.append('conf_th', this.value)

      const URL = 'http://127.0.0.1:8000/update_parameter_capture/api/'

      axios.post(URL, formData)
    },
    getImageCaptureTotal () {
      try {
        // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
        // const URL = 'https://391d10e67ebf.ngrok.io/test/api/'
        // const res = await axios.get(PROXY_URL + URL)

        const formData = new FormData()
        formData.append('id_siswa', this.display_nisn)

        const URL = 'http://127.0.0.1:8000/captured_all/api/'

        axios.post(URL, formData).then((response) => {
          this.data_image_total = response.data
        }, (error) => {
          console.log(error)
        })
      } catch (e) {
        console.error(e)
      }
    },
    setCurrentSiswa () {
      try {
        // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
        // const URL = 'https://391d10e67ebf.ngrok.io/test/api/'
        // const res = await axios.get(PROXY_URL + URL)
        this.showLargeModal = false
        this.display_nisn = this.input_nisn

        const formData = new FormData()
        formData.append('id_siswa', this.display_nisn)

        const URL = 'http://127.0.0.1:8000/set_current_collect_data/api/'

        axios.post(URL, formData).then((response) => {
          // eslint-disable-next-line camelcase
          const res_data = response.data
          this.display_nama = res_data[0].name
        }, (error) => {
          console.log(error)
        })
        this.getImageCaptureTotal()
      } catch (e) {
        console.error(e)
      }
    },
    setCurrentSiswaCancel () {
      try {
        this.showLargeModal = false
      } catch (e) {
        console.error(e)
      }
    },
    showAll () {
      this.isHidden = true
      this.getImageCaptureTotal()
    },
  },
}
</script>
