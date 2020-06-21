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
              v-model="toggles.selected"
              label="Display Confidence"
            />
          </fieldset>
        </div>
        <div class="flex xs12 lg10 x12 mb-0">
          <div
            class="title mb-3"
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
</template>

<script>
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
        unselected: false,
        selected: false,
        disabled: true,
        small: false,
        large: false,
      },
      simpleOptions: [
        {
          id: 1,
          description: 'SSD Resnet',
        },
        {
          id: 2,
          description: 'MTCNN',
        },
      ],
      simpleSelectModel: 'SSD Resnet',
    }
  },
  methods: {
    sendDetails () {
      this.showToast('Saved!')
    },
  },
}
</script>
