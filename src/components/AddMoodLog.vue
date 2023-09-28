<template>
    <form @submit="onSubmit">
        <fieldset class="mood-radio-container">
            <legend>Choose the face that best describes your current mood:</legend>
            <MoodRadioButton 
                :class="{ 'mood-radio-selected': mood === this.selectedMood }" 
                v-for="mood in moods"
                :mood="mood" 
                :key="mood" 
                @mood-selected="onMoodSelected" 
            />
        </fieldset>
        <p class="error-label" v-if="(errorLabel.length > 0)">{{ errorLabel }}</p>
        <fieldset>
            <legend>Add a note to elaborate on your pick or describe potential causes:</legend>
            <textarea v-model="note" name="note" id="note" placeholder="Note goes here..."></textarea>
        </fieldset>
        <div class="button-container">
            <button type="submit">Save</button>
        </div>
    </form>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import MoodRadioButton from './MoodRadioButton.vue'

export default {
    name: 'AddMoodLog',
    components: {
        MoodRadioButton
    },
    data() {
        return {
            moods: ['great', 'good', 'meh', 'bad', 'awful'],
            selectedMood: '',
            note: '',
            apiKey: "f62f9ceea8922342e6a3a6e73c3bc6e5",
            urlBase: "https://api.openweathermap.org/data/2.5/",
            weatherTemp: '',
            weatherDesc: '',
            date: '',
            time: '',
            errorLabel: ''
        }
    },
    methods: {
        async getWeather() {
            if (navigator.geolocation) {
                try {
                    const location = await this.fetchLocation()
                    await this.fetchWeather(location.coords.latitude, location.coords.longitude)
                } catch (error) {
                    console.log("Could not fetch location")
                }
            } else {
                console.log("Geolocation is not supported by this browser")
            }
        },
        fetchLocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(
                    location => resolve(location),
                    error => reject(error))
            })
        },
        async fetchWeather(latitude, longitude) {
            try {
                if (latitude !== '' && longitude !== '') {
                    const response = await fetch(`${this.urlBase}weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${this.apiKey}`)

                    const weatherData = await response.json()

                    this.weatherTemp = Math.round(weatherData.main.temp)
                    this.weatherDesc = weatherData.weather[0].description
                }
            } catch (error) {
                console.log("Could not fetch weather")
            }
        },
        async onSubmit(e) {
            e.preventDefault()

            if (!this.selectedMood) {
                this.errorLabel = 'Please select a mood'
                return
            } else {
                this.errorLabel = ''
            }

            await this.getWeather()

            this.getDateTime()

            const newLog = {
                id: uuidv4(),
                mood: this.selectedMood,
                note: this.note,
                temp: this.weatherTemp,
                desc: this.weatherDesc,
                date: this.date,
                time: this.time,
            }

            // Send new log up to RecordView
            this.$emit('add-log', newLog)

            // Clear form inputs
            this.selectedMood = ''
            this.note = ''
        },
        getDateTime() {
            /*
            Hoffmann, B. and Storey, D. (2019). JavaScript - Get Month Name from Date. 
            [online] stackoverflow.com. Available at: https://stackoverflow.com/a/18648314 [Accessed 10 Nov. 2022].
            */
            const dateObj = new Date()
            const currentDate = `${('0' + dateObj.getDate()).slice(-2)} ${dateObj.toLocaleString('default', { month: 'short' })} ${dateObj.getFullYear()}`
            this.date = currentDate

            /*
            Sirko and Bambam (2014). Javascript - getMinutes() 0-9 - How to Display Two Digit Numbers? 
            [online] stackoverflow.com. Available at: https://stackoverflow.com/a/23579692 [Accessed 10 Nov. 2022].
            */
            const currentTime = `${dateObj.getHours()}:${('0' + dateObj.getMinutes()).slice(-2)}`
            this.time = currentTime
        },
        onMoodSelected(mood) {
            this.selectedMood = mood
        }
    },
    emits: ['add-log']
}
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 1em;
    margin: 1em 0.5em 0 0.5em;
    border-radius: 10px;
    /* 
    CSS Scan (2022). Beautiful CSS box-shadow Examples #22 - CSS Scan. 
    [online] getcssscan.com. Available at: https://getcssscan.com/css-box-shadow-examples [Accessed 26 Nov. 2022].
‌    */
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
}
fieldset {
    border: 0;
    padding-bottom: 1em;
}
legend {
    padding-bottom: 1em;
    font-size: 1.2em;
}
textarea {
    width: 100%;
    font-size: 1.2em;
    padding: 0.5em 0.5em 6em 0.5em;
    border-radius: 0.3em;
}
.error-label {
    color: red;
    font-size: 1.2em;
    text-align: center;
    margin-bottom: 1em;
}
.mood-radio-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin-bottom: 1em;
}
.mood-radio-selected {
    border-radius: 20%;
    background: #d8d8d8;
}
.button-container {
    display: flex;
    align-self: center;
}
button {
    padding: 0.5em 6em;
}
</style>