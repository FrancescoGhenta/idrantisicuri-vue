<template>
    <BaseDialog v-if="!validID" title="ID idrante non valido">
        <template #default>
            <p>ID idrante non valido, inserire un ID idrante valido</p>
        </template>
        <template #actions>
            <base-button class="btn-primary" @click="confirmError">Ok</base-button>
        </template>
    </BaseDialog>
    <div id="page_content">
        <TheHeader title="Dettagli idrante " />
        <form id="insert_code" @submit.prevent="checkInpID()">
            <h3 style="margin-bottom: 22px">Inserire ID idrante:</h3>
            <input id="IDidr_input" type="text" v-model="input" placeholder="ID idrante">
            <input @click="checkInpID()" type="button" class="btn btn-primary" id="button_conf" value="Conferma">
        </form>

        <hr>

        <table id="info_table">
            <tr>
                <td class="keys">ID</td>
                <td class="vals" id="info_id">{{ id }}</td>
            </tr>
            <tr>
                <td class="keys">Latitudine</td>
                <td class="vals" id="info_lat">{{ details.location_lat }}</td>
            </tr>
            <tr>
                <td class="keys">Longitudine</td>
                <td class="vals" id="info_lon">{{ details.location_lon }} </td>
            </tr>
            <tr>
                <td class="keys">Immagini</td>
                <td class="vals" id="info_imgs">
                    <span v-if="details.imgs.length === 0" id="info_img_error">Non è presente nessuna immagine</span>
                    <a v-for="img in details.imgs" :key="img" :href="'../assets/' + img" target="_blank"><img :src="'../../assets/' + img" style="height: 150px;"></a>
                </td>

                
            </tr>
            <tr>
                <td class="keys">Operativo</td>
                <td class="vals" id="info_op">{{ details.operative ? 'Si' : 'No' }}</td>
            </tr>

            <tr v-for="field in Object.keys(details.fields)" :key="field">
                <td class="keys">{{ field }}</td>
                <td class="vals" id="info_c1">{{ details.fields[field] }}</td>
            </tr>
        </table>
        <div id="actionBtn">
            <a id="editBtn_a" :href="`/edit-idr/${id}`"><button class="btn-primary">Modifica</button></a>
            <a id="deleteBtn_a" href="#"><button class="btn-primary">Elimina</button></a>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: '',
      input_confirm: '',
      validID: true
    }
  },

  name: 'Details',
  props: ['id'],
  computed: {
    details() {
      return this.$store.state.map.pins.find(item => item.id === this.id);
    }
  },
  methods: {
    checkInpID() {
      const ids = this.$store.state.map.pins.map(item => item.id);
      if (this.input !== '' && ids.includes(this.input)) {
        console.log(this.input);
        this.$router.push(`/details/${this.input}`);
        this.input = '';
        this.validID = true;
      } else {
        this.validID = false;
        this.input = '';
      }
    },
    confirmError() {
      this.validID = true;
    }
  }
}
</script>

<style scoped>
#insert_code {
    display: flex;
    align-items: center;
    gap: 15px;
    justify-content: center;
}

#info_table {
    margin: auto;
    border-radius: 15px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid gray;
    border-width: 1px;
    padding: 20px;
    margin-top: 30px;
}



.keys,
.vals {
    padding: 10px;
}

#IDidr_input {
    border-radius: 15px;
    text-indent: 10px;
    height: 20px;
    border: 1px solid gray;
    box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.15);
}

#page_content {
    margin: 1%;
}

.keys {
    font-weight: bold;
}
</style>