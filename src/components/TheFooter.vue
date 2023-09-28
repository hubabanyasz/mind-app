<template>
    <footer>
        <p>{{ content }}</p>
    </footer>
</template>

<script>
export default {
    name: 'TheFooter',
    props: {
        content: String
    }
}
</script>

<style scoped>
footer {
    margin-top: 2em;
    padding: 1rem;
    text-align: center;
}
</style>