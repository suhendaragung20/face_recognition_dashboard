<template>
  <div class="row">
    <va-list fit class="mb-0">
      <va-item>
        <div class="flex xs12 lg10 x12 mb-0">
          <va-select
            :label="$t('Model')"
            v-model="simpleSelectModel"
            textBy="description"
            :options="simpleOptions"
          />
        </div>
        <div class="flex xs12 lg10 x12 mb-0">
          <fieldset>
            <va-toggle
              small
              v-model="toggles.conf"
              label="Display Confidence"
            />
          </fieldset>
        </div>
        <div class="flex xs12 lg10 x12 mb-0">
          <div
            class="title mb-3"
            :style="{color: this.$themes.primary}"
          >{{$t('Threshold Confidence')}}</div>
          <va-slider
            value-visible
            v-model="value"
          />
        </div>
      </va-item>

    </va-list>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'bank-details-tab',
  data () {
    return {
      form: {
        bankName: 'Raiffeisen Bank',
        accountName: 'GoalSaver',
        sortCode: '6558912',
        accountNumber: '000876432',
        notes: '',
      },
      value: 60,
      toggles: {
        conf: true,
        selected: false,
        disabled: true,
        small: false,
        large: false,
      },
      simpleOptions: [
        {
          id: 1,
          description: 'VGG19',
        },
        {
          id: 2,
          description: 'Resnet18',
        },
        {
          id: 3,
          description: 'Openvino',
        },
      ],
      simpleSelectModel: 'VGG19',
    }
  },
  async created () {
    this.getParameter()
    this.updateParameter()
    this.polling = setInterval(() => this.updateParameter(), 1000)
  },
  beforeDestroy () {
    clearInterval(this.polling)
  },
  methods: {
    sendDetails () {
      this.showToast('Saved!')
    },
    async updateParameter () {
      const formData = new FormData()
      formData.append('emot_conf', this.toggles.conf ? 1 : 0)
      formData.append('emot_th', this.value)

      const URL = 'http://127.0.0.1:8000/update_parameter_access_emot/api/'

      axios.post(URL, formData)
    },
    async getParameter () {
      const URL = 'http://127.0.0.1:8000/get_parameter_access/api/'
      const res = await axios.get(URL)

      const dat = res.data
      if (dat[0].emot_conf === '0') {
        this.toggles.conf = false
      } else {
        this.toggles.conf = true
      }
      this.value = Number(dat[0].emot_th)
    },
  },
}
</script>
