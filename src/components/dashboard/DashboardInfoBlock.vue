<template>
  <div class="row row-equal">

    <div class="flex xs12 md6 xl3">
      <va-card
        stripe="info"
        :title="$t('Training Data')"
      >
        Last Training
        18 Juni 2020, 12.30
        <div class="flex">
          <va-select
            :label="$t('Face Identifier')"
            v-model="simpleSelectModel"
            textBy="description"
            :options="simpleOptions"
          />
        </div>
        <div class="row mt-1">
          <va-button color="primary" target="_blank" href="https://github.com/epicmaxco/vuestic-ui">
            {{$t('Train Now!')}}
          </va-button>
        </div>
      </va-card>
    </div>

    <div class="flex xl6 xs12">
      <div class="row">
        <div
          class="flex xs12 sm4"
          v-for="(info, idx) in infoTiles"
          :key="idx"
        >
          <va-card class="mb-4" :color="info.color">
            <p class="display-2 mb-0" style="color: white;">{{ info.value }}</p>
            <p>{{$t(info.text)}}</p>
          </va-card>
        </div>
      </div>

      <div class="row">
        <div class="flex xs12 md3">
          <va-card>
            <p class="display-2 mb-1" :style="{color: this.$themes.primary}">11</p>
            <p class="no-wrap">{{$t('Siswa')}}</p>
          </va-card>
        </div>
        <div class="flex xs12 md9">
          <va-card>
            <div class="row row-separated">
              <div class="flex xs2">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.primary}">53</p>
                <p class="text--center mb-1">{{$t('Neutral')}}</p>
              </div>
              <div class="flex xs2">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.success}">80</p>
                <p class="text--center no-wrap mb-1">{{$t('Happy')}}</p>
              </div>
              <div class="flex xs2">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.gray}">10</p>
                <p class="text--center mb-1">{{$t('Sad')}}</p>
              </div>
              <div class="flex xs2">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.warning}">23</p>
                <p class="text--center mb-1">{{$t('Surprise')}}</p>
              </div>
              <div class="flex xs2">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.danger}">17</p>
                <p class="text--center mb-1">{{$t('Anger')}}</p>
              </div>
              <div class="flex xs2">
                <p class="display-2 mb-1 text--center" :style="{color: this.$themes.dark}">20</p>
                <p class="text--center mb-1">{{$t('????')}}</p>
              </div>
            </div>
          </va-card>
        </div>
      </div>
    </div>
    <va-modal v-model="modal">
      <div style="position: relative;">
        <va-button @click="showPrevImage" icon="fa fa-chevron-left" flat style="position: absolute; top: 50%;"/>
        <va-button @click="showNextImage" icon="fa fa-chevron-right" flat style="position: absolute; top: 50%; right: 0;"/>
        <transition>
          <img :src="images[currImage]" style="height: 50vh; max-width: 100%;">
        </transition>
      </div>
    </va-modal>
  </div>
</template>

<script>
export default {
  name: 'DashboardInfoBlock',
  data () {
    return {
      infoTiles: [{
        color: 'success',
        value: '20',
        text: 'New Faces',
        icon: '',
      }, {
        color: 'danger',
        value: '57',
        text: 'Deleted Faces',
        icon: '',
      }, {
        color: 'info',
        value: '346',
        text: 'Total Faces',
        icon: '',
      }],
      modal: false,
      currImage: 0,
      images: [
        'https://i.imgur.com/qSykGko.jpg',
        'https://i.imgur.com/jYwT08D.png',
        'https://i.imgur.com/9930myH.jpg',
        'https://i.imgur.com/2JxhWD6.jpg',
        'https://i.imgur.com/MpiOWbM.jpg',
      ],
      simpleOptions: [
        {
          id: 1,
          description: 'Facenet',
        },
        {
          id: 2,
          description: 'Openvino',
        },
      ],
      simpleSelectModel: 'Facenet',
    }
  },
  methods: {
    showModal () {
      this.modal = true
    },
    showPrevImage () {
      this.currImage = !this.currImage ? this.images.length - 1 : this.currImage - 1
    },
    showNextImage () {
      this.currImage = this.currImage === this.images.length - 1 ? 0 : this.currImage + 1
    },
  },
}
</script>

<style lang="scss">
  .row-separated {
    .flex + .flex {
      border-left: 1px solid #e3eaeb;
    }

    @include media-breakpoint-down(xs) {
      p:not(.display-2) {
        font-size: 0.875rem;
      }
    }
  }

  .dashboard {
    .va-card__header--over {
      @include media-breakpoint-up(md) {
        padding-top: 0 !important;
      }
    }

    .va-card__image {
      @include media-breakpoint-up(md) {
        padding-bottom: 0 !important;
      }
    }
  }
</style>
