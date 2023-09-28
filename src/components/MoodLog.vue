<template>
    <div class="log-container">
        <h1>{{ log.date }} at {{ log.time }}</h1>
        <div class="log-container-top">
            <h2 v-if="log.temp !== ''">{{ log.temp }} C<sup>°</sup> with {{ log.desc }}</h2>
            <img 
                :src="getImageUrl(log.mood)" 
                :alt="(`emoji feeling ${log.mood}`)"
            >
        </div>
        <div class="log-container-bottom">
            <h3>{{ log.mood }}</h3>
            <p>{{ log.note }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MoodLog',
    data() {
        return {
            src: ''
        }
    },
    props: {
        log: Object
    },
    methods: {
        /* 
        Otziii (2022). Image - Passing and Binding Img Src from Props in Vue.js. 
        [online] stackoverflow.com. Available at: https://stackoverflow.com/a/73659672 [Accessed 15 Nov. 2022].
        
        Twitter Inc. (2020). Twemoji. [online] twemoji.twitter.com. 
        Available at: https://twemoji.twitter.com/ [Accessed 22 Oct. 2022].‌
        */
        getImageUrl(fileName) {
            return new URL(`../assets/${fileName}.png`, import.meta.url)
        }
    }
}
</script>

<style scoped>
.log-container {
    border-radius: 10px;
    /* 
    CSS Scan (2022). Beautiful CSS box-shadow Examples #22 - CSS Scan. 
    [online] getcssscan.com. Available at: https://getcssscan.com/css-box-shadow-examples [Accessed 26 Nov. 2022].
‌    */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    margin-bottom: 3em;
    padding: 0 2em 0 0em;
}
.log-container-top {
    padding: 0em 2em;
    align-items: center;
    display: flex;
    justify-content: space-between;
}
.log-container-bottom {
    padding: 0em 3em 6em 3em;
}
img {
    height: 4.5em;
    width: 4.5em;
    padding: 0.25em;
}
h1 {
    padding-left: 1em;
    padding-top: 1em;
    padding-bottom: 0.5em;
    font-size: 2em;
    letter-spacing: 0.5px;
}
h2 {
    color: #34567F;
    font-size: 1.1em;
}
h3 {
    text-transform: capitalize;
    font-size: 1.8em;
    letter-spacing: 1px;
    padding-bottom: 0.5em;
    padding-top: 0.5em;
}
p {
    font-size: 1.5rem;
    line-height: 1.45;
    color: #333;
}
</style>