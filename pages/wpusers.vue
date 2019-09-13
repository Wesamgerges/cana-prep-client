<template>
  <b-container fluid>
      <h1>Cana Prep</h1>
    <!-- User Interface controls -->
    <b-row>
      <b-col lg="6" class="my-1">
        <b-form-group
          label="Search"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
          </b-input-group>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col sm="2" md="3" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="2"
          label-align-sm="right"
          label-size="sm"
          label-for="perPageSelect"
          class="mb-0"
        >
          <b-form-select
            v-model="perPage"
            id="perPageSelect"
            size="sm"
            :options="pageOptions"
          ></b-form-select>
        </b-form-group>
      </b-col>

      <b-col sm="7" md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      stacked="md"
      striped
      bordered
      outlined
      hover
      
      sticky-header 
      head-variant="dark"
      :items="items"
      :fields="fields"
      :busy="loading"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >
      <template v-slot:cell(name)="row">
        {{ row.value.first }} {{ row.value.last }}
      </template>

      <template v-slot:cell(actions)="row"> 
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Certificate
        </b-button>       
      </template>

      <template v-slot:row-details="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
  </b-container>
</template>

<script>
  export default {
    // auth:false,
    data() {
      return {
        items: [],
        fields: [
            { label: 'ID', key: 'ID' },
                  
            {
            label: 'User Name',
            align: 'left',
            sortable: true,
            key: 'display_name',
          },
          { label: 'Name', key: 'full_name' },  
          { label: 'Email', key: 'user_email' },
          { label: 'Nicename', key: 'user_nicename' },
          { label: 'Registered On', key: 'user_registered'},    
          { key: 'actions', label: 'Actions' } 
            
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 25,
        pageOptions: [ 25, 50, 100],
        sortBy: '',
        sortDesc: false,
        sortDirection: 'asc',
        filter: null,
        loading: false,
        filterOn: [],
        infoModal: {
          id: 'info-modal',
          title: '',
          content: ''
        }
      }
    },
    computed: {
      sortOptions() {
        // Create an options list from our fields
        return this.fields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key }
          })
      }
    },
    async created() {
        await this.getDataFromApi();
        // Set the initial number of items
        this.totalRows = this.items.length
    },
    methods: {
      async info(item, index, button) {

        const fileName = item.ID + '_' + item.first_name + '_' + item.last_name + '_' + Date.now() + '.pdf';
        try {
            this.$axios({
                url: '/certificate/' + item.ID,
                method: 'GET',
                responseType: 'blob', // important
            }).then((response) => {
                const url = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
            });
        } catch (error) {
            console.error(error);
        }
      },
      resetInfoModal() {
        this.infoModal.title = ''
        this.infoModal.content = ''
      },
      onFiltered(filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length
        this.currentPage = 1
      },
      async getDataFromApi () {
        this.loading = true
        try {
            const response = await this.$axios('/wpusers')
            this.items = response.data
            // return {items: response.data}
        } catch (error) {
            console.error(error);
        }
         this.loading = false;
      }   
    }
  }
</script>