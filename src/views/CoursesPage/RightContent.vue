<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <b-form-group>
                    <b-form-input
                        placeholder="Type to search"
                        v-model="filters.search"
                    />
                </b-form-group>
            </div>
            <div class="col-md-4">
                <b-form-group>
                    <b-form-select
                        v-model="filters.domain"
                        :options="domains"
                    />
                </b-form-group>
            </div>
            <div class="col-md-4">
                <b-form-group>
                    <b-form-select
                        v-model="filters.standard"
                        :options="standards"
                    />
                </b-form-group>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <b-button
                    @click="$emit('createLessons')"
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary  float-right"
                >
                    Create Lessons
                </b-button>
            </div>
            <div class="col-md-12 mt-2">
                <b-card no-body>
                    <b-card-body class="p-0">
                        <b-card-header v-if="!$store.state.app.selected_course">
                            <strong>
                                Please Select a Lessons Group or Standard
                            </strong>
                        </b-card-header>
                        <b-card-header v-else-if="lessions.length === 0">
                            <strong> No data found </strong>
                        </b-card-header>
                        <b-table-simple responsive v-else hover>
                            <b-thead head-variant="light">
                                <b-tr>
                                    <b-th> # </b-th>
                                    <b-th> Image </b-th>
                                    <b-th> Lessons name </b-th>
                                    <b-th> Pass Percent (%) </b-th>
                                    <b-th> Access Type </b-th>
                                    <b-th> PDF </b-th>
                                    <b-th> Actions </b-th>
                                </b-tr>
                            </b-thead>
                            <b-tbody is="draggable" tag="tbody">
                                <b-tr v-for="ls of lessions" :key="ls.id">
                                    <b-td>
                                        <feather-icon
                                            icon="AlignJustifyIcon"
                                            class="cursor-pointer"
                                        />
                                    </b-td>
                                    <b-td>
                                        <a :href="ls.lession_name_file" target="_blank" v-if="ls.lession_name_file">
                                        <img
                                            :src="ls.lession_name_file"
                                            height="30"
                                            width="30"
                                        />
                                        </a>
                                        <span v-else>N/A</span>
                                    </b-td>
                                    <b-td>
                                        {{ ls.lession_name }}
                                    </b-td>
                                    <b-td> {{ ls.pass_percent }} % </b-td>
                                    <b-td>
                                        {{ ls.access_type }}
                                    </b-td>
                                    <b-td>
                                        <b-button
                                            v-if="ls.pdf"
                                            tag="a"
                                            :href="ls.pdf"
                                            :download="`${ls.lession_name}.pdf`"
                                            v-ripple.400="
                                                'rgba(113, 102, 240, 0.15)'
                                            "
                                             size="sm"
                                            variant="outline-primary"
                                            class="btn-icon"
                                        >
                                            <feather-icon icon="FileIcon" />
                                        </b-button>
                                        <span v-else>N/A</span>
                                    </b-td>
                                    <b-td class="text-nowrap">
                                        <b-button
                                            @click="editLession(ls)"
                                            variant="outline-primary"
                                            size="sm"
                                            class="btn-icon"
                                        >
                                            <feather-icon
                                                icon="EditIcon"
                                                class="cursor-pointer"
                                            />
                                        </b-button>
                                        <b-button
                                            @click="deleteLession(ls)"
                                            variant="outline-danger"
                                            size="sm"
                                            class="btn-icon ml-1"
                                        >
                                            <feather-icon
                                                icon="TrashIcon"
                                                class="cursor-pointer"
                                            />
                                        </b-button>
                                    </b-td>
                                </b-tr>
                            </b-tbody>
                        </b-table-simple>
                        <!-- <b-table responsive="sm" :items="items" /> -->
                    </b-card-body>
                </b-card>
            </div>
        </div>
        <confirm-delete />
        <CreateLessons />
    </div>
</template>
<script>
import { BButton } from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import CreateLessons  from "./Lessons/Create";
import draggable from 'vuedraggable'
import {
    BFormInput,
    BFormGroup,
    BFormSelect,
    BTable,
    BCard,
    BCardBody,
    BCardHeader,
    BTableSimple,
    BThead,
    BTr,
    BTh,
    BTd,
    BTbody,
} from 'bootstrap-vue';

export default {
    components: {
        BButton,
        BFormInput,
        BFormGroup,
        BFormSelect,
        BTable,
        BCard,
        BCardBody,
        BCardHeader,
        BTableSimple,
        BThead,
        BTr,
        BTh,
        BTd,
        BTbody,
        draggable,
        CreateLessons
    },
    directives: {
        Ripple,
    },
    data() {
        return {
            domains: this.DB.domains,
            standards: this.DB.standards,
            filters: {
                domain: null,
                standard: null,
                search: '',
            },
            items: [],
        }
    },
    methods: {
        deleteLession (value) {
            this.$emit("fireDelete",{
                type: "lession",
                title: 'Lessons',
                id: value.id,
                course: this.$store.state.app.selected_course,
                lesson_type: value.lesson_type,
            });
        },
        editLession (value) {
            this.$emit('editLession',value);
        },
    },
    computed: {
        lessions: function() {
            let  allLessions = this.$store.state.app.selected_lession_lists;

            allLessions = allLessions.filter((arr)=>{
                if (this.filters.domain) return arr.domains === this.filters.domain; 
                else return arr;
            }).filter((arr)=>{
                if (this.filters.standard) return arr.standard === this.filters.standard;
                else return arr;
            }).filter(
                item => item.lession_name.toLowerCase().indexOf(this.filters.search) > -1
                );

            return allLessions;
        },
    },
}
</script>