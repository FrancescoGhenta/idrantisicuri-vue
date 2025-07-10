<template>
    <div id="page_content">
        <TheHeader title="Segnalzione di un idrante" />
        <hr>
        <div id="tables">
            <div id="left-column">
                <table class="ins_table" id="info_table">
                    <tr>
                        <td class="keys">Latitudine</td>
                        <td class="vals"><input id="info_id_lat" type="text" v-model="coords[0]"></td>
                    </tr>
                    <tr>
                        <td class="keys">Longitudine</td>
                        <td class="vals"><input id="info_id_lon" type="text" v-model="coords[1]"></td>
                    </tr>
                    <tr>
                        <td class="keys">Immagini</td>
                        <td>
                            <input type="file" id="insert_img" name="immagini" accept=".jpeg,.jpg,.png" multiple
                                @change="previewImages(event)" placeholder="imgs_input" title="Carica immagini"
                                aria-label="Carica immagini" style="display: none;">
                            <label for="insert_img" class="btn btn-secondary" id="upload_label">Carica immagini</label>
                            <div id="preview" style="display: flex; gap: 8px; margin-top: 8px;"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="keys">Operativo</td>
                        <td>
                            <div style="display: flex; flex-direction: column; align-items: flex-start;">
                                <label><input type="radio" name="operativo" id="operative" value="si"> Sì</label>
                                <label><input type="radio" name="operativo" id="n_operative" value="no"> No</label>
                                <label><input type="radio" name="operativo" id="unk_operative" value="non_lo_so"> Non lo
                                    so</label>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="keys">Campo 1</td>
                        <td class="vals"><input id="camp_1" type="text"></td>
                    </tr>
                    <tr>
                        <td class="keys">Campo 2</td>
                        <td class="vals"><input id="camp_2" type="text"></td>
                    </tr>
                    <tr>
                        <td class="keys">Campo 3</td>
                        <td class="vals"><input id="camp_3" type="text"></td>
                    </tr>
                </table>

                <div id="form-buttons">
                    <button class=" btn-secondary" @click="window.location.href = '../index.html'">Annulla</button>
                    <button id="conferma" class="btn-primary" @click="insert_data()">Conferma</button>
                </div>
            </div>


            <table class="ins_table" id="select_on_map">
                <tr>
                    <td>
                        <Map type="add-idr" ref="map" />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Map from './Map.vue';

export default {
    components: {
        Map
    },
    data() {
        return {
            coords: [null, null],
            imgs: [],
            operative: true,
            fields: {
                camp1: '',
                camp2: '',
                camp3: ''
            }
        }
    },
    methods: {
        previewImages(event) {
            const preview = document.getElementById('preview');
            preview.innerHTML = '';

            const files = event.target.files;
            if (!files) return;

            // limite 3 file
            const maxFiles = 3;
            if (files.length > maxFiles) {
                alert(`Puoi caricare al massimo ${maxFiles} immagini.`);
                event.target.value = ''; // Resetta l'input file
                return;
            }

            // controllo tipo file
            const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
            Array.from(files).forEach(file => {
                if (!allowedTypes.includes(file.type)) {
                    console.warn("Formato non supportato:", file.type);
                    return;
                }

                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.style.maxWidth = '60px';
                    img.style.maxHeight = '60px';
                    img.style.objectFit = 'cover';
                    preview.appendChild(img);
                };
                reader.readAsDataURL(file);
            });
        },
        insert_data() {
            this.$refs.map.addPin(this.coords, this.imgs, this.operative, this.fields);
            this.$refs.map.flyTo(this.coords);
            //this.$router.push('/');
        },
        // previewImages(event) {
        //     const preview = document.getElementById('preview');
        //     preview.innerHTML = '';

        //     const files = event.target.files;
        //     if (!files) return;

        //     // limite 3 file
        //     const maxFiles = 3;
        //     if (files.length > maxFiles) {
        //         alert(`Puoi caricare al massimo ${maxFiles} immagini.`);
        //         event.target.value = ''; // Resetta l'input file
        //         return;
        //     }

        //     // controllo tipo file
        //     const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
        //     Array.from(files).forEach(file => {
        //         if (!allowedTypes.includes(file.type)) {
        //             console.warn("Formato non supportato:", file.type);
        //             return;
        //         }

        //         const reader = new FileReader();
        //         reader.onload = function (e) {
        //             const img = document.createElement('img');
        //             img.src = e.target.result;
        //             img.style.maxWidth = '60px';
        //             img.style.maxHeight = '60px';
        //             img.style.objectFit = 'cover';
        //             preview.appendChild(img);
        //         };
        //         reader.readAsDataURL(file);
        //     });
        // },

        //  insert_data() {
        //             var operative = document.getElementById("operative").checked;
        //             camp1 = document.getElementById("camp_1").value;
        //             camp2 = document.getElementById("camp_2").value;
        //             camp3 = document.getElementById("camp_3").value;
        //             console.log("inserimento dati");
        //             console.log("ID: " + id);
        //             console.log("Latitudine: " + lat);
        //             console.log("Longitudine: " + lon);
        //             console.log("Operativo: " + operative);
        //             console.log("Campo 1: " + camp1);
        //             console.log("Campo 2: " + camp2);
        //             console.log("Campo 3: " + camp3);
        //         }
    }
}
</script>

<style scoped>
body {
    text-align: center;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.ins_table {
    margin: auto;
    border-radius: 15px;
    box-shadow: 15px 15px 15px rgba(0, 0, 0, 0.05);
    border: 1px solid gray;
    border-width: 1px;
    padding: 20px;
    margin-top: 30px;
}

#tables {
    display: flex;
    width: 1500px;
    margin: auto;
}

#mappa {
    width: 100%;
    height: 100%;
    border-radius: 12px;
}

#select_on_map {
    width: 900px;
    height: 600px;
    padding: 0px;
    background-color: white;
    border-radius: 15px;
    box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.1);
}

.keys,
.vals {
    padding: 10px;
}

.keys {
    font-weight: bold;
}

#info_id {
    margin: 10px;
    border-radius: 15px;
    text-indent: 10px;
}

#form-buttons {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 15px;
}

#tables {
    display: flex;
    width: 1500px;
    margin: auto;
    align-items: flex-start;
}

#left-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#upload_label {
    font-weight: normal;
}
</style>