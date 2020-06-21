<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs12">
        <va-card :title="$t('Profil')">
          <form>
            <div class="row mb-3">
              <div class="flex md4 sm6 xs12">
                NISN
                <va-input
                  v-model="simple"
                  placeholder="input 5 digit NISN"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                Nama
                <va-input
                  v-model="simple"
                  placeholder="input nama"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                Email
                <va-input
                  v-model="withIcon"
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
                  v-model="simpleSelectModel"
                  textBy="description"
                  :options="simpleOptions"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                Tanggal Lahir
                <va-date-picker
                  v-model="datepicker.simple"
                />
              </div>
              <div class="flex md4 sm6 xs12">
                Alamat
                <va-input
                  v-model="simple"
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
              <va-button large outline icon-right="glyphicon glyphicon-pencil"> {{ $t('Tambah') }}</va-button>
            </div>

          </form>
        </va-card>
      </div>

    </div>
  </div>
</template>

<script>

export default {
  name: 'form-elements',
  data () {
    return {
      isMale: true,
      chosenCountry: '',
      simple: '',
      withIcon: '',
      withButton: '',
      withDescription: '',
      clearableText: 'Vasili Savitski',
      successfulEmail: 'andrei@dreamsupport.io',
      wrongEmail: 'andrei@dreamsupport',
      messages: ['Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor ' +
        'incididunt ut labore et dolore magna aliqua.'],
      errorMessages: ['Field should contain a valid email'],
      simpleOptions: [
        {
          id: 1,
          description: 'First option',
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
      multiSelectModel: [],
      multiSelectCountriesModel: [],
      searchableSelectModel: '',
      multiSearchableSelectModel: [],
      radioSelectedOption: 'option1',
      radioSelectedDisableOption: 'option1',
      checkbox: {
        unselected: false,
        selected: true,
        readonly: true,
        disabled: true,
        error: false,
        errorMessages: true,
      },
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
    }
  },
  methods: {
    clear (field) {
      this[field] = ''
    },
  },
}
</script>

<style>
  .row.row-inside {
    max-width: none;
  }
</style>
