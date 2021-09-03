<template>
    <div>
        <div
            class="ma-5"
        >
            <h1>
                VOTE RESULTS
            </h1>
        </div>
        <v-tabs
            v-model="tab"
            slider-color="yellow"
            fixed-tabs
        >
            <v-tab
                v-for="item in items"
                :key="item.tab"
                @click="choosePlatform(item.tab)"
            >
                {{ item.tab }}
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <div>
                <v-tab-item
                    v-for="item in items"
                    :key="item.tab"
                >
                    <v-card
                        v-for="(i,index) in voteData"
                        :key="index"
                        tile
                        class="my-5 mx-5"
                    >
                        <v-card-title class="justify-center">
                            {{ i.data.group }}
                        </v-card-title>
                        <div
                            class="d-flex flex-column"
                            v-for="name in i.data.choices"
                            :key="name.name"
                        >
                            <v-list-item two-line>
                                <v-list-item-avatar>
                                    <v-avatar
                                        class="ma-3 ml-6"
                                        size="120px"
                                    >
                                        <v-img
                                            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUPEhIVFRUVFxcVFRUVFRcVFRUVFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8PFS0ZFRkrLTcrKystKystNystLS0tNzc3NzctLTc3LS0tNy03LSsrNysrLS03KzcrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAGhABAQEAAwEAAAAAAAAAAAAAAAEREiHhAv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A00BAAUBUAAAVFBAAVFQAAAAABABVEBQQUBBaAgqIAAACgAAaAAAAAAAAAACAAAAoAAAtBAAMDkiCqgoAAAAAAKICoAAACoAAABFBAAAAUQAAAAAAQFQUAEABQAAwAAVAVAQVAABVBAAFQBUAAAQUAAQBUigAAqAAAAABQAoKCAIACgAAKAioAAAoAIAgCooBVBAAVABUAAVAAEABQFRAAUAAAAAoChoCAIACgAAACoAAACoAAoCCoIACiCgUKAABVQAAAgCAAoUAAVAAAAAAUEVFBAABUQAFDFqAAqAUAF0MQAVABUAAAAQBUUUQAAAUQBQAQEAVFANAAABUA7DQAFBAAKqAEAAAAABUFBAAWICAAoqAAAAqACoAuCIChFBAAAAAABaAgAAqAqFKgAAAqiBAAAAooIAgoCiQAFQIAUABUAAAABUAAAFSKkQAFAIIACioFAAQXBNFAAABAAAAAAUAAAAAEAACAAAVQAAAAAQXUVAAFAAAAAAFQAVAAAAgCAAAoigAAqAAAACC4JooqIA6KgC1IAHoAHytAEgAFVAAABUAUAAqACwAIACRaAKAD//Z"
                                        />
                                    </v-avatar>
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>{{ name.name }}</v-list-item-title>
                                    <v-list-item-subtitle>{{ name.description }}</v-list-item-subtitle>
                                </v-list-item-content>
                                <div class="result-time">
                                    {{ name.time.toFixed(1) }} Hours
                                </div>
                            </v-list-item>
                        </div>
                    </v-card>
                </v-tab-item>
            </div>
        </v-tabs-items>
    </div>
</template>

<script>

export default {
    props: {
        voteData: Array
    },
    data() {
        return {
            tab: null,
            items: [
                { tab: 'WEBSITE', },
                { tab: 'MOBILE', },

            ],
        }
    },
    methods: {
        choosePlatform(platform) {
            this.$emit('choose-platform', platform)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
