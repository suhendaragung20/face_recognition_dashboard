<template>
  <va-card :title="$t('Showing 9 of 11')">
    <div class="row align--center mb-0">
      <div class="flex xs12 sm6">
        <va-input
          class="ma-0"
          :value="term"
          :placeholder="$t('tables.searchByName')"
          @input="search"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>

      <div class="flex xs12 sm2">
        <div class="d-flex justify--end">
          <div class="d-flex justify--end">
            <va-button small icon-right="entypo entypo-plus"> {{ $t('Tambah Data') }}</va-button>
          </div>
        </div>
      </div>

      <div class="flex xs12 sm4">
        <div class="d-flex justify--end">
          <va-button-toggle
            outline
            v-model="mode"
            :options="modeOptions"
            style="max-width: 100%;"
          />
        </div>
      </div>

    </div>

    <div class="row align--center mb-1">
      <div class="flex xs12 sm6">

      </div>

      <div class="flex xs12 sm6">

      </div>
    </div>

    <va-data-table
      :fields="mode ? detailedFields : fields"
      :per-page="parseInt(9)"
      :data="filteredData"
      :loading="loading"
      hoverable
    >
      <template slot="icon">
        <va-icon name="fa fa-user" color="secondary" />
      </template>

      <template v-slot:status="props">
        <va-badge :color="getStatusColor(props.rowData.status)">
          {{ props.rowData.status }}
        </va-badge>
      </template>

      <template v-slot:actions="props">
        <va-button
          small
          outline
          color="success"
          icon="fa fa-check"
          class="ma-0"
          @click="resolveUser(props.rowData)"
        >
          {{ $t('edit') }}
        </va-button>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import debounce from 'lodash/debounce'
// import data from '../markup-tables/data.json'
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      loading: false,
      term: null,
      mode: 1,
      polling: null,
    }
  },
  computed: {
    fields () {
      return [{
        name: '__slot:icon',
        width: '30px',
        dataClass: 'text-center',
      }, {
        name: 'nama',
        title: this.$t('tables.headings.name'),
        width: '30%',
      }, {
        name: 'email',
        title: this.$t('tables.headings.email'),
        width: '30%',
      }, {
        name: '__slot:status',
        title: this.$t('tables.headings.status'),
        width: '20%',
        sortField: 'status',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    detailedFields () {
      return [{
        name: '__slot:icon',
        width: '30px',
        dataClass: 'text-center',
      }, {
        name: 'nama',
        title: this.$t('tables.headings.name'),
        width: '25%',
      }, {
        name: 'email',
        title: this.$t('tables.headings.email'),
        width: '25%',
      },
      {
        name: 'kelas_display',
        title: this.$t('kelas'),
        with: '25%',
      },
      {
        name: '__slot:status',
        title: this.$t('tables.headings.status'),
        width: '25%',
        sortField: 'status',
      },
      {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
    modeOptions () {
      return [{
        value: 0,
        label: this.$t('bermasalah'),
      }, {
        value: 1,
        label: this.$t('semua'),
      }]
    },
    filteredData () {
      if (!this.term || this.term.length < 1) {
        return this.users
      }

      return this.users.filter(item => {
        return item.name.toLowerCase().startsWith(this.term.toLowerCase())
      })
    },
  },
  async created () {
    this.getDataSiswa()
    // this.polling = setInterval(() => this.getDataSiswa(), 1000)
  },
  beforeDestroy () {
    // clearInterval(this.polling)
  },
  methods: {
    async getDataSiswa () {
      try {
        // const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
        // const URL = 'https://391d10e67ebf.ngrok.io/test/api/'
        // const res = await axios.get(PROXY_URL + URL)

        const URL = 'http://127.0.0.1:8000/get_data_siswa/api/'
        const res = await axios.get(URL)

        this.users = res.data
      } catch (e) {
        console.error(e)
      }
    },
    getStatusColor (status) {
      if (status === 'baik') {
        return 'success'
      }

      if (status === 'normal') {
        return 'info'
      }

      return 'danger'
    },
    resolveUser (user) {
      this.loading = true

      setTimeout(() => {
        const idx = this.users.findIndex(u => u.id === user.id)
        this.users.splice(idx, 1)
        this.loading = false

        this.showToast(this.$t('dashboard.table.resolved'), {
          icon: 'fa-check',
          position: 'bottom-right',
          duration: 1500,
        })
      }, 500)
    },
    search: debounce(function (term) {
      this.term = term
    }, 400),
  },
}
</script>

<style lang="scss">
</style>
