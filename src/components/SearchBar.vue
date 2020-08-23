<template>
    <div>
        <v-text-field
            v-model="title"
            outlined
            @keypress.enter="searchMovies">
            <template v-slot:prepend-inner>
                <v-icon>search</v-icon>
            </template>
            <template v-slot:append>
                <v-progress-circular
                    v-if="loading"
                    size="24"
                    color="primary"
                    indeterminate/>
            </template>

        </v-text-field>
    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    computed: {
        title: {
            // getter
            get () {
                return this.$store.state.movie.title
            },
            // setter
            set (title) {
                // commit : stor의 mutations 부분을 실행할 때
                this.$store.commit('movie/updateState', {
                    title: title
                })
            }
        },
        loading () {
            return this.$store.state.movie.loading
        }
    },
    methods: {
        ...mapActions('movie', [
            'searchMovies'
        ])
    }
}
</script>