<template>
  <b-container fluid>
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
      <b-col sm="4" md="6" class="my-1">
        <b-form-group
          label="Per page"
          label-cols-sm="6"
          label-cols-md="4"
          label-cols-lg="3"
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
      striped
      bordered
      outlined
      hover
      responsive='sm'
      sort-icon-left
      sticky-header 
      head-variant="dark"
      :items="items"
      :fields="fields"
      :busy="loading"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :filterIncludedFields="filterOn"    
      @filtered="onFiltered"
    >
     <template v-slot:thead-top="data">
        <b-tr>
          <b-th class="bg-primary text-center" colspan="4"  style="border:none;">User</b-th>
          <b-th class="bg-primary text-center" colspan="12" style="border:none;">Lectures</b-th>
          <b-th class="bg-primary text-center" colspan="3"  style="border:none;">Certificate</b-th>          
        </b-tr>
      </template>

      <template v-slot:cell(bride)="row"> 
         <b-button size="sm" @click="getCertificate(row.item, row.index, 1)" variant="danger" class="mr-1">
          Bride
        </b-button>           
      </template>

      <template v-slot:cell(groom)="row"> 
        <b-button size="sm" @click="getCertificate(row.item, row.index, 0)" variant="primary" class="mr-1">
          Groom
        </b-button>               
      </template>
    </b-table>
    <br/> <br/>
  </b-container>
</template>

<script>
  export default {
    // auth:false,
    data() {
      return {
        items: [],
        fields: [
          { label: 'ID', key: 'ID', sortable: true },
          { label: 'Groom', key: 'gname', sortable: true },  
          { label: 'Bride', key: 'bname', sortable: true },  
          { label: 'Email', key: 'user_email', sortable: true },    
          { label: '1', key: 'lectures.1' },  
          { label: '2', key: 'lectures.2' }, 
          { label: '3', key: 'lectures.3' },  
          { label: '4', key: 'lectures.4' }, 
          { label: '5', key: 'lectures.5' },  
          { label: '6', key: 'lectures.6' }, 
          { label: '7', key: 'lectures.7' },  
          { label: '8', key: 'lectures.8' }, 
          { label: '9', key: 'lectures.9' },  
          { label: '10', key: 'lectures.10' }, 
          { label: '11', key: 'lectures.11' },  
          { label: '12', key: 'lectures.12' },                      
          { key: 'bride', label: 'Bride' } ,
          { key: 'groom', label: 'Groom' }, 
        ],
        totalRows: 1,
        currentPage: 1,
        perPage: 50,
        pageOptions: [ 25, 50, 100],
        sortBy: 'ID',
        sortDesc: true,
        filter: null,
        loading: false,
        filterOn: [],       
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
      console.log(await this.$auth.hasScope('admin'))
      if(!await this.$auth.hasScope('admin')) {
        this.$router.push('/')
      }
        await this.getDataFromApi();
        // Set the initial number of items
        this.totalRows = this.items.length
    },
    methods: {
      async getCertificate(item, index, type) {

        const fileName = item.ID + '_' + 'CP Certificate ' + (type ? item.bname: item.gname) + '.pdf';
        try {
            this.$axios({
                url: '/certificate/' + item.ID + '/' + type,
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

<style scoped>
.b-table-sticky-header {
    overflow-y: visible; 
    max-height: 800px;
}
</style>