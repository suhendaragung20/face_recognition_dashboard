<template>
  <div class="cards">
    <div class="cards-container row d-flex wrap align--start">
      <!-- eslint-disable vue/valid-v-for -->

      <div class="row">
        <div class="flex xs12">
          <va-card>

            <div class="row">

              <div class="flex xs12 sm10">
                <va-card>
                  <div class="row align--center mb-0">
                    <div class="flex xs12 sm8">
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

                  </div>

                  <va-modal
                    v-model="showLargeModal"
                    size="large"
                    :title=" $t('Update Data') "
                    :message=null
                    :okText=null
                    :cancelText=null>
                    <div class="align--center">
                      <div class="flex xs12">
                        <va-card :title="$t('Profil')">
                          <form>
                            <div class="row mb-3">
                              <div class="flex md4 sm6 xs12">
                                NISN
                                <va-input
                                  v-model="input1"
                                  placeholder="input 5 digit NISN"
                                />
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Nama
                                <va-input
                                  v-model="input2"
                                  placeholder="input nama"
                                />
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Email
                                <va-input
                                  v-model="input3"
                                  placeholder="input email"
                                >
                                  <va-icon
                                    slot="prepend"
                                    color="gray"
                                    name="fa fa-envelope-o"
                                  />
                                </va-input>
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Kelas
                                <va-select
                                  v-model="input4"
                                  textBy="description"
                                  :options="simpleOptions"
                                />
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Tanggal Lahir
                                <va-date-picker
                                  v-model="input5"
                                />
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Alamat
                                <va-input
                                  v-model="input6"
                                  placeholder="input alamat"
                                />
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Foto
                                <va-file-upload
                                  type="gallery"
                                  file-types=".png, .jpg, .jpeg, .gif"
                                  dropzone
                                  v-model="advancedGallery"
                                />
                              </div>
                              <div class="flex md4 sm6 xs12">
                                Gender
                                <fieldset>
                                  <va-radio-button
                                    option="option1"
                                    v-model="radioSelectedOption"
                                    label="Laki - laki"
                                  />
                                  <va-radio-button
                                    option="option2"
                                    v-model="radioSelectedOption"
                                    label="Perempuan"
                                  />
                                </fieldset>
                              </div>
                              <div class="flex md4 sm6 xs12">

                              </div>
                            </div>
                            <div class="row mb-0">
                              <div class="flex md4 sm6 xs12">
                                <va-button icon-right="glyphicon glyphicon-pencil"> {{ $t('Update') }}</va-button>
                                <va-button Cancel outline> {{ $t('Cancel') }}</va-button>
                              </div>
                              <div class="flex md4 sm6 xs12">

                              </div>
                              <div class="flex md4 sm6 xs12">
                                <div class="d-flex justify--end">
                                  <va-button small color="danger" icon-right="entypo entypo-trash"> {{ $t('Delete') }}</va-button>
                                </div>
                              </div>
                            </div>

                          </form>
                        </va-card>
                      </div>
                    </div>
                  </va-modal>

                  <va-data-table
                    :fields="mode ? detailedFields : fields"
                    :per-page="parseInt(10)"
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

                    <template v-slot:actions="">
                      <va-button
                        small
                        outline
                        color="success"
                        icon="fa fa-check"
                        class="ma-0"
                        @click="showLargeModal = true"
                      >
                        {{ $t('edit') }}
                      </va-button>
                    </template>

                  </va-data-table>
                </va-card>
              </div>

              <div class="flex xs12 sm2">

                <div slot="body">

                  <va-list fit class="mb-2">
                    <va-list-label>
                      {{ $t('Tingkat') }}
                    </va-list-label>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_kelas_x" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Kelas X
                        </va-item-label>
                      </va-item-section>
                    </va-item>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_kelas_xi" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Kelas XI
                        </va-item-label>
                      </va-item-section>
                    </va-item>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_kelas_xii" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Kelas XII
                        </va-item-label>
                      </va-item-section>
                    </va-item>
                  </va-list>

                  <va-list fit class="mb-2">

                    <va-list-label>
                      {{ $t('Status') }}
                    </va-list-label>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_status_1" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Baik
                        </va-item-label>
                      </va-item-section>
                    </va-item>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_status_2" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Normal
                        </va-item-label>
                      </va-item-section>
                    </va-item>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_status_3" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Kurang Baik
                        </va-item-label>
                      </va-item-section>
                    </va-item>
                  </va-list>

                  <va-list fit class="mb-2">
                    <va-list-label>
                      {{ $t('Gender') }}
                    </va-list-label>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_gender_l" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Laki - laki
                        </va-item-label>
                      </va-item-section>
                    </va-item>

                    <va-item>
                      <va-item-section side>
                        <va-checkbox v-model="f_gender_p" />
                      </va-item-section>

                      <va-item-section>
                        <va-item-label>
                          Perempuan
                        </va-item-label>
                      </va-item-section>
                    </va-item>

                  </va-list>

                  <div class="row align--center mb-0">
                    <va-button style="width: 100%;"> {{ $t('Filter') }}</va-button>
                  </div>

                </div>

              </div>
            </div>
          </va-card>

        </div>

      </div>
    </div>
  </div>

</template>

<script>
import debounce from 'lodash/debounce'
// import data from '../markup-tables/data.json'
import axios from 'axios'

export default {
  data () {
    return {
      users: [],
      showLargeModal: false,
      loading: false,
      term: null,
      mode: 1,
      polling: null,
      f_kelas_x: true,
      f_kelas_xi: true,
      f_kelas_xii: true,
      f_status_1: true,
      f_status_2: true,
      f_status_3: true,
      f_gender_l: true,
      f_gender_p: true,
      options: [
        { label: '10', value: 'one' },
        { label: '15', value: 'two' },
        { label: '20', value: 'three' },
      ],
      model: 'one',
      simpleOptions: [
        {
          id: 1,
          description: 'Kelas X',
        },
        {
          id: 2,
          description: 'Second option',
        },
        {
          id: 3,
          description: 'Third option',
        },
      ],
      simpleSelectModel: '',
      toggles: {
        unselected: false,
        selected: true,
        disabled: true,
        small: false,
        large: false,
      },
      datepicker: {
        simple: '2018-05-09',
        time: '2018-05-08 14:10',
        range: '2018-05-08 to 2018-05-23',
        disabled: '2018-05-09',
        multiple: '2018-04-25, 2018-04-27',
        customFirstDay: '2018-05-09',
        customDate: '2017-Dec-06',
      },
      input1: '12345',
      input2: 'Agung Suhendar',
      input3: 'suhendaragung20@gmail.com',
      input4: 'Kelas X',
      input5: '',
      input6: 'Sumedang',
      radioSelectedOption: 'option1',
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
        name: 'nisn',
        title: this.$t('NISN'),
        width: '10%',
      }, {
        name: 'name',
        title: this.$t('tables.headings.name'),
        width: '20%',
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
