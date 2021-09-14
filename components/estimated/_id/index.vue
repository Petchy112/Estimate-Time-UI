<template>
    <div v-if="estimateDetails">
        <div class="mt-5 mx-5">
            <div class="head">
                {{ estimateDetails.projectName }}
            </div>
            <div class="selected-platform">
                Platform : {{ estimateDetails.platform }}
            </div>
        </div>
        <v-row
            justify="start"
            class="pb-5 px-5"
        >
            <v-card
                width="400"
                class="py-3 my-3"
                flat
            >
                <v-card-content>
                    <v-card-title class="ml-2 py-0">
                        Number of developer: {{ estimateDetails.qty }}
                    </v-card-title>
                    <v-card-title class="ml-2 py-1">
                        Estimated time : {{ (time/8)/5 }} weeks
                    </v-card-title>
                    <v-card-title class="ml-2 py-0">
                        System size: {{ estimateDetails.size }}
                    </v-card-title>
                </v-card-content>
            </v-card>
        </v-row>
        <v-divider />

        <v-col cols="12">
            <div class="head pt-5">
                SELECTED FUNCTION
            </div>
            <div class="d-flex flex-wrap">
                <v-card
                    class="ma-5"
                    max-width="344"
                    v-for="selected in estimateDetails.choice"
                    :key="selected.index"
                >
                    <v-avatar>
                        <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUPEhIVFRUVFxcVFRUVFRcVFRUVFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8PFS0ZFRkrLTcrKystKystNystLS0tNzc3NzctLTc3LS0tNy03LSsrNysrLS03KzcrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAGhABAQEAAwEAAAAAAAAAAAAAAAEREiHhAv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A00BAAUBUAAAVFBAAVFQAAAAABABVEBQQUBBaAgqIAAACgAAaAAAAAAAAAACAAAAoAAAtBAAMDkiCqgoAAAAAAKICoAAACoAAABFBAAAAUQAAAAAAQFQUAEABQAAwAAVAVAQVAABVBAAFQBUAAAQUAAQBUigAAqAAAAABQAoKCAIACgAAKAioAAAoAIAgCooBVBAAVABUAAVAAEABQFRAAUAAAAAoChoCAIACgAAACoAAACoAAoCCoIACiCgUKAABVQAAAgCAAoUAAVAAAAAAUEVFBAABUQAFDFqAAqAUAF0MQAVABUAAAAQBUUUQAAAUQBQAQEAVFANAAABUA7DQAFBAAKqAEAAAAABUFBAAWICAAoqAAAAqACoAuCIChFBAAAAAABaAgAAqAqFKgAAAqiBAAAAooIAgoCiQAFQIAUABUAAAABUAAAFSKkQAFAIIACioFAAQXBNFAAABAAAAAAUAAAAAEAACAAAVQAAAAAQXUVAAFAAAAAAFQAVAAAAgCAAAoigAAqAAAACC4JooqIA6KgC1IAHoAHytAEgAFVAAABUAUAAqACwAIACRaAKAD//Z">
                    </v-avatar>

                    <v-card-title class="pa-0">
                        <v-list-item two-line>
                            <v-list-item-content>
                                <v-list-item-title>{{ selected }}</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-card-title>
                </v-card>
            </div>
        </v-col>
    </div>
</template>

<script>

export default {
    props: {
        estimateDetails: Array,
        time: Number
    },


}
</script>

<style scoped>
.head {
    font-weight: bold;
    text-align: center;
    font-size: 38px;
    text-transform: uppercase;
}
.selected-platform {
    font-size: 18px;
    text-align: center;
    font-weight:400;

}
</style>
