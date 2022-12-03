<script>
    export default {
        props: {
            author: Number,
            message: String,
            time: String
        },
        data(){
            return {
                date: `${new Date(parseInt(this.time)).getDate()}`,
                month: `${new Date(parseInt(this.time)).getMonth()}`,
                months: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ],
                hours: `${new Date(parseInt(this.time)).getHours()}`,
                minutes: `${new Date(parseInt(this.time)).getMinutes()}`,
                year: `${new Date(parseInt(this.time)).getFullYear()}`
            }
        },
        computed: {
            timestamp(){
                return `${this.hours.length < 2 ? `0${this.hours}` : this.hours}.${this.minutes.length < 2 ? `0${this.minutes}` : this.minutes }`
            },
            dateTimestamp(){
                return `${this.months[this.month]} ${this.date}, ${this.year}`;
            }
        }
    }
</script>

<template>
    <section v-if="author">
        <div class="w-full py-[5px] px-[20px] text-sm border-b border-white/5">
            <div class="flex items-center">
                <h1 class="py-[1px] text-indigo-400 font-semibold rounded-full">Author</h1>
                <p class="ml-[10px] mb-[2px] mt-[2px] text-[12px] mobileL:text-[11px] text-white/30 px-[20]">{{ timestamp }}</p>
                <div class="mx-[6px] w-[2px] h-[2px] bg-white/30 rounded-full"></div>
                <p class="mb-[2px] mt-[2px] text-[12px] mobileL:text-[11px] text-white/30 px-[20]">{{ dateTimestamp }}</p>
            </div>
            <p class="mt-[2px] text-[13px]">{{ message }}</p>
        </div>
    </section>
    
    <section v-else>
        <div class="w-full py-[5px] px-[20px] text-sm border-b border-white/5">
            <div class="flex items-center">
                <h1 class="py-[1px] text-white/60 font-semibold rounded-full">Anon</h1>
                <p class="ml-[10px] mb-[2px] mt-[2px] text-[12px] mobileL:text-[11px] text-white/30 px-[20]">{{ timestamp }}</p>
                <div class="mx-[6px] w-[2px] h-[2px] bg-white/30 rounded-full"></div>
                <p class="mb-[2px] mt-[2px] text-[12px] mobileL:text-[11px] text-white/30 px-[20]">{{ dateTimestamp }}</p>
            </div>
            <p class="mt-[2px] text-[13px]">{{ message }}</p>
        </div>
    </section>
</template>