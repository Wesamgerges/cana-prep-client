<template>
  <v-card>
    <v-card-title>
      Cana Prep
      <div class="flex-grow-1"></div>
      <v-text-field
        v-model="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="wpusers"
      :options.sync="options"
      :server-items-length="totalwpusers"
      :loading="loading"
      class="elevation-1"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
  export default {
    auth:false,
    data () {
      return {
        search: '',
        totalwpusers: 0,
        wpusers: [],
        loading: true,
        options: {},
        headers: [
          {
            text: 'Name',
            align: 'left',
            sortable: false,
            value: 'display_name',
          },
          { text: 'Email', value: 'user_email' },
          { text: 'Nicename', value: 'user_nicename' },
          { text: 'registered', value: 'user_registered' },     
          { text: 'Generate', value: 'user_registered' },           
        ],
      }
    },
    watch: {
      options: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.wpusers = data.items
              this.totalwpusers = data.total
            })
        },
        deep: true,
        immediate: true,
      },
    },
    methods: {
        async getDataFromApi () {
            this.loading = true
            try {
                const response = await this.$axios('/wpusers')
                return {items: response.data}
            } catch (error) {
                console.error(error);
            }
        }
    }
        
  }
</script>


<style>

</style>