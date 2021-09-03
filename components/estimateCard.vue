<template>
    <div>
        <div
            class="d-flex flex-column"
        >
            <v-card rounded="sm" flat class="mb-3 mx-3 choice-card" :class="active == true ? 'active': ''" @click="$emit('chooseChoice',choices)">
                <v-col cols="12">
                    <v-list-item>
                        <v-list-item-avatar>
                            <v-img max-width="50" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUPEhIVFRUVFxcVFRUVFRcVFRUVFRUXFxUVFRUYHSggGBolHRUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDQ0NFQ8PFS0ZFRkrLTcrKystKystNystLS0tNzc3NzctLTc3LS0tNy03LSsrNysrLS03KzcrLSsrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAXAAEBAQEAAAAAAAAAAAAAAAAAAQcC/8QAGhABAQEAAwEAAAAAAAAAAAAAAAEREiHhAv/EABUBAQEAAAAAAAAAAAAAAAAAAAAB/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A00BAAUBUAAAVFBAAVFQAAAAABABVEBQQUBBaAgqIAAACgAAaAAAAAAAAAACAAAAoAAAtBAAMDkiCqgoAAAAAAKICoAAACoAAABFBAAAAUQAAAAAAQFQUAEABQAAwAAVAVAQVAABVBAAFQBUAAAQUAAQBUigAAqAAAAABQAoKCAIACgAAKAioAAAoAIAgCooBVBAAVABUAAVAAEABQFRAAUAAAAAoChoCAIACgAAACoAAACoAAoCCoIACiCgUKAABVQAAAgCAAoUAAVAAAAAAUEVFBAABUQAFDFqAAqAUAF0MQAVABUAAAAQBUUUQAAAUQBQAQEAVFANAAABUA7DQAFBAAKqAEAAAAABUFBAAWICAAoqAAAAqACoAuCIChFBAAAAAABaAgAAqAqFKgAAAqiBAAAAooIAgoCiQAFQIAUABUAAAABUAAAFSKkQAFAIIACioFAAQXBNFAAABAAAAAAUAAAAAEAACAAAVQAAAAAQXUVAAFAAAAAAFQAVAAAAgCAAAoigAAqAAAACC4JooqIA6KgC1IAHoAHytAEgAFVAAABUAUAAqACwAIACRaAKAD//Z" />
                        </v-list-item-avatar>

                        <v-list-item-content>
                            <v-list-item-title>{{ choices.name }}</v-list-item-title>
                            <v-list-item-subtitle>{{ choices.description }}</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-card>
        </div>
    </div>
</template>
<script>
export default {
    props: [ 'choices', 'active' ]


}

</script>
<style lang="scss" scoped>

.choice-card{
    background-color:#e3e3e3  !important ;
    &.active {
    background-color: #7BE891 !important ;

}
}
.v-list-item__title {
    font-weight:400;

}
.v-list-item__subtitle {
    font-weight:300;
    opacity: 80%;
}

</style>
