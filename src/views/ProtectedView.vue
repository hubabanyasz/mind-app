<template>
    <div id="protected-view-container">
        <form @submit="onSubmit">
            <h1 v-text="pinExists ? 'Enter PIN' : 'Set PIN'"></h1>
            <p class="alertLabel" v-if="!pinExists">Remember this PIN.</p>
            <p v-if="!pinExists">If you forget it, you will need to reset the application and all data
                will be erased!</p>
            <input 
                type="password" 
                inputmode="numeric" 
                name="pin" 
                v-model.trim="pin"
                pattern="[0-9]+" 
                placeholder="PIN"
            >
            <p class="errorLabel" v-if="(errorLabel.length > 0)">{{ errorLabel }}</p>
            <button v-if="pinExists" type="submit">Log in</button>
            <button v-else type="submit">Confirm</button>
        </form>
    </div>
</template>
  
<script>
import router from '../router'
export default {
    data() {
        return {
            pinExists: false,
            pin: '',
            errorLabel: ''
        }
    },
    methods: {
        onSubmit(e) {
            e.preventDefault()

            if (!this.pinExists) {
                if (this.pin.length < 4) {
                    this.errorLabel = 'PIN must contain at least 4 digits'
                    return
                } else {
                    this.$store.dispatch('createPin', this.pin)
                    router.push('/')
                }
            } else {
                // Try to log in
                this.$store.dispatch('checkPin', this.pin)

                // Check if login successful
                if (this.$store.getters.isAuth) {
                    router.push('/')
                } else {
                    this.errorLabel = 'Incorrect PIN'
                }
            }
        }
    },
    mounted() {
        // Check if a PIN is set
        if (localStorage.getItem('hash')) {
            this.pinExists = true
        }
    }
}
</script>

<style scoped>
#protected-view-container {
    margin-top: 2.5em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0.5em;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 1;
    padding: 1em 1em 2em 1em;
    border: 1px solid #ccc;
    border-radius: 10px;
    /* 
    CSS Scan (2022). Beautiful CSS box-shadow Examples #22 - CSS Scan. 
    [online] getcssscan.com. Available at: https://getcssscan.com/css-box-shadow-examples [Accessed 26 Nov. 2022].
‌    */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
    max-width: 40em;
}
input {
    justify-content: center;
    width: 16em;
    padding: 0.5em;
    border-radius: 0.3em;
    margin: 1em 0 1em 0;
    font-size: 1em;
}
h1 {
    margin: 1.2em 0 1em 0;
    font-size: 2em;
    text-align: center;
}
p {
    font-size: 1.2em;
    text-align: center;
    line-height: 3em;
}
.errorLabel {
    color: red;
}
.alertLabel {
    color: #325886;
}
button {
    margin-top: 1em;
    padding: 0.5em 4.5em;
}
</style>