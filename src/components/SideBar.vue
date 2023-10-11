<template>
    <!-- Sidebar Component -->
    <div
        class="xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500 flex justify-between items-center flex-col h-full w-full sm:w-64 bg-gray-900 ">
        <div
            class="flex justify-start items-start flex-col  xl:rounded-r transform xl:translate-x-0 ease-in-out transition duration-500  w-full bg-gray-900    ">
            <div
                class="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700">
                <button @click="toggleMenu1"
                    class="focus:outline-none focus:text-indigo-400 text-left text-white flex justify-between items-center w-full py-5 space-x-14">
                    <p class="text-sm leading-5 uppercase">المواد</p>
                    <ArrowDown v-if="!menu1Visible" name="arrow-down" />
                    <ArrowUp v-if="menu1Visible" name="arrow-up" />
                </button>
                <div v-if="menu1Visible">
                    <div class=" flex justify-start flex-col items-start pb-5 ">
                        <RouterLink to="/products"
                            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-52">
                            <p class="text-base leading-4  ">المنتجات</p>
                        </RouterLink>
                        <RouterLink to="/rawMaterials"
                            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-52">
                            <p class="text-base leading-4  ">المواد الخام</p>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <!-- Sidebar Menu 2 -->
            <div
                class="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 ">
                <button @click="toggleMenu2"
                    class="focus:outline-none focus:text-indigo-400 text-left text-white flex justify-between items-center w-full py-5 space-x-14">
                    <p class="text-sm leading-5 uppercase">الموردين</p>
                    <ArrowDown v-if="!menu2Visible" name="arrow-down" />
                    <ArrowUp v-if="menu2Visible" name="arrow-up" />
                </button>
                <div v-if="menu2Visible"
                    class="flex flex-col justify-between items-center h-full pb-6   px-6  w-full  space-y-32 ">
                    <div class=" flex justify-start flex-col items-start pb-5 ">
                        <RouterLink to="/suppliers"
                            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-52">
                            <!-- svg of customers -->
                            <p class="text-base leading-4  ">كل الموردين</p>
                        </RouterLink>
                        <RouterLink to="/suppliers/create"
                            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-52">
                            <!-- svg of customers -->
                            <p class="text-base leading-4  ">اضافة مورد</p>
                        </RouterLink>
                    </div>
                </div>
            </div>

            <!-- Sidebar Menu 3 -->
            <div
                class="flex flex-col justify-start items-center px-6 border-b border-gray-600 w-full hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700  ">
                <button @click="toggleMenu3"
                    class="focus:outline-none focus:text-indigo-400 text-left text-white flex justify-between items-center w-full py-5 space-x-14">
                    <p class="text-sm leading-5 uppercase">العملاء</p>
                    <ArrowDown v-if="!menu3Visible" name="arrow-down" />
                    <ArrowUp v-if="menu3Visible" name="arrow-up" />
                </button>
                <div v-if="menu3Visible"
                    class="flex flex-col justify-between items-center h-full pb-6   px-6  w-full  space-y-32 ">
                    <div class=" flex justify-start flex-col items-start pb-5 ">
                        <RouterLink to="/customers"
                            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-52">
                            <!-- svg of customers -->
                            <p class="text-base leading-4  ">كل العملاء</p>
                        </RouterLink>
                        <RouterLink to="/customers/create"
                            class="flex justify-start items-center space-x-6 hover:text-white focus:bg-gray-700 focus:text-white hover:bg-gray-700 text-gray-400 rounded px-3 py-2  w-52">
                            <!-- svg of customers -->
                            <p class="text-base leading-4  ">اضافة عميل</p>
                        </RouterLink>
                    </div>
                </div>
            </div>
        </div>
        <button @click="logout"
            class="focus:outline-none focus:text-indigo-400 text-left p-3  mb-3 text-white flex justify-between items-center w-3/4 hover:bg-gray-700 rounded-xl   ">
            <p class="text-sm leading-5 uppercase">Logout</p>
            <Logout name="logout" />
        </button>
    </div>
</template>


<script setup lang="ts" >
import { ref } from 'vue'
import { useAuthStore } from '@/stores'
import { useRouter } from 'vue-router'
import ArrowDown from '@/components/icons/ArrowDown.vue'
import ArrowUp from '@/components/icons/ArrowUp.vue'
import Logout from '@/components/icons/Logout.vue'

const logout = async () => {
    const auth = useAuthStore()
    const router = useRouter()
    await auth.logout()
}
const menu1Visible = ref(false)
const menu2Visible = ref(false)
const menu3Visible = ref(false)

const toggleMenu1 = () => {
    menu1Visible.value = !menu1Visible.value
}
const toggleMenu2 = () => {
    menu2Visible.value = !menu2Visible.value
}
const toggleMenu3 = () => {
    menu3Visible.value = !menu3Visible.value
}
</script>