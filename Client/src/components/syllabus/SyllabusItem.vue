<template> <!--to add a picture in form-->
<article>
    <h4>{{ contentModel.contentName }}</h4>
    <div class="gallery">
        <div class="picture" v-for='item in pictures' :key='item.id'>
            <img v-bind:src='item.picture' :alt='item.pictureName'>
            <p><strong>{{ }}</strong></p>
        </div>
    </div>
    <p>{{ contentModel.name }}</p>
    <p>{{ contentModel.text }}</p>
</article>
</template>

<script>
import axios from 'axios';
import serverDetails from '../../constants';

export default {
    name: 'SyllabusItem',
    props: ['contentModel'],
    data() {
        return {
            pictures: []
        }
    },
    
    methods: {
        deletePicture(id) {
            if (confirm(`Are you sure you want to do delete the picture?`)) {
                let url = serverDetails.url;
                let params = {...serverDetails.params};
                axios.delete(`${url}picture/${id}`, {
                        params
                    })
                    .then(() => {
                        this.pictures = this.pictures.filter((picture) => {
                            return picture.id != id;
                        })
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        },
        getPictures() {
            this.error = null;
            let url = serverDetails.url;
            let params = {...serverDetails.params};
            params.search = { };
            params.search['contentId'] = {
                column: 'contentId',
                operator: '=',
                criteria: this.contentModel.id
            };
            // get non-observed version of the current model, 
            // so when the model changes it will not effect the product id search
            params.search = {...params.search};
            axios.get(`${url}picture/`, {
                    params
                })
                .then(response => {
                    this.pictures = [];
                    if (response.data) {
                        response.data.forEach((record) => {
                            let picture = {
                                id: record.id,
                                contentId: record.contentId,
                                pictureName: record.pictureName,
                                picture: 'data:image/jpeg;base64,' + record.picture
                            }
                            this.pictures.push(picture);
                        });
                    }
                })
                .catch(error => {
                    this.error = error.toString();
                    console.log(error);
                })
        }
    },
    mounted() {
        this.getPictures();
    }
}
</script>

<style scoped>
article {
    padding-top: 10px;
    border-bottom: 3px solid rgb(33, 54, 240);
}

.delete-icon {
    color: white;
    text-align: right;
    padding-top: 5px;
    padding-right: 10px;
}

.picture {
    display: inline-block;
    text-align: center;
    background-color: white;
    margin: 10px;
}

img {
    margin: 10px;
}

p {
    margin: 8px;
}
</style>
