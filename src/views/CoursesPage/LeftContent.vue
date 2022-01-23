<template>
    <div>
        <b-button v-ripple.400="'rgba(113, 102, 240, 0.15)'" @click="createCourse" variant="outline-primary btn-block">
            Create Courses
        </b-button>
        <div class="row pt-2">
            <div class="col-md-6">
                <b-form-select v-model="filters.grade" :options="grades" />
            </div>
            <div class="col-md-6">
                <b-form-select v-model="filters.subject" :options="subjects" />
            </div>
        </div>
        <!-- courses list --->
        <div class="row pt-2">
            <div class="col-md-12">
                <draggable @start="drag=true" @end="drag=false">
                    <b-card class="mb-1" v-for="c of courses" :key="c.id">
                        <b-card-header class='p-0'>
                            <div class="d-flex align-items-center">
                                <feather-icon size="24" class="mr-1" icon="ListIcon" />
                                <b-card-text class="ml-25" v-b-toggle="`collapse_lesson-${c.id}`">
                                    {{ c.name }}
                                </b-card-text>
                            </div>
                            <b-dropdown variant="link" no-caret toggle-class="p-0" right>
                                <template #button-content>
                                    <feather-icon icon="MoreVerticalIcon" size="18" />
                                </template>
                                 <b-dropdown-item @click="createLessonGroup(c)">
                                    <feather-icon icon="PlusIcon" size="16" />
                                    <span class="align-middle ml-50">Add New</span>
                                </b-dropdown-item>
                                <b-dropdown-item @click="editCourse(c)">
                                    <feather-icon icon="EditIcon" size="16" />
                                    <span class="align-middle ml-50">Edit</span>
                                </b-dropdown-item>
                                   <b-dropdown-item @click="deleteCourse(c)">
                                    <feather-icon icon="TrashIcon" size="16" />
                                    <span class="align-middle ml-50">Delete</span>
                                </b-dropdown-item>
                            </b-dropdown>
                        </b-card-header>
                        <b-collapse :id="`collapse_lesson-${c.id}`" class="mt-2">
                            <b-card class="border mb-1 cursor-pointer" no-body v-for="lt of c.lessions_types" :key="lt.id" @click="updateSelectedLession(c.id,lt.id,lt.lessions)">
                                <b-card-body class='p-0'>
                                    <b-card-header class='p-1' 
                                        :class="{'bg-secondary btn-outline-primary text-white': selected_courses.course == c.id && selected_courses.id == lt.id}">
                                        <div class="d-flex align-items-center">
                                            <feather-icon size="15" class="mr-1" icon="ListIcon" />
                                            <b-card-text class="ml-25">
                                                {{ lt.name }} 
                                            </b-card-text>
                                        </div>
                                        <b-dropdown variant="link" no-caret toggle-class="p-0" right>
                                            <template #button-content>
                                                <feather-icon icon="MoreVerticalIcon" size="18" />
                                            </template>
                                            <b-dropdown-item @click="editCourseLesson(lt,c.id)">
                                                <feather-icon icon="EditIcon" size="16" />
                                                <span class="align-middle ml-50">Edit</span>
                                            </b-dropdown-item>
                                               <b-dropdown-item @click="deleteCourseLesson(lt,c.id)">
                                                <feather-icon icon="TrashIcon" size="16" />
                                                <span class="align-middle ml-50">Delete</span>
                                            </b-dropdown-item>
                                        </b-dropdown>
                                    </b-card-header>
                                </b-card-body>
                            </b-card>
                        </b-collapse>
                    </b-card>
                </draggable>
            </div>
        </div>
        <createCourse />
        <CreateLessonGroup/>
        <confirm-delete />
    </div>
</template>
<script>
import {
    BButton,
    BFormSelect,
    BCard,
    BCardTitle,
    BCardText,
    BCardBody,
    BCardHeader,
    BCollapse,
    VBToggle,
    BDropdown,
    BDropdownItem
} from 'bootstrap-vue';
import Ripple from 'vue-ripple-directive';
import CreateCourse  from "./Courses/Create";
import CreateLessonGroup  from "./LessonGroup/Create";
import draggable from 'vuedraggable'
export default {
    components: {
        BButton,
        BFormSelect,
        BCard,
        BCardTitle,
        BCardText,
        BCardBody,
        BCardHeader,
        BCollapse,
        draggable,
        BDropdown,
        BDropdownItem,
        CreateCourse,
        CreateLessonGroup
    },
    data() {
        return {
  
            grades: this.DB.grades,
            selected_courses: {
                course: null,
                id: null
            },
            deleteObjectsCourse: {
                id: null,
                type: 'course',
            },
            filters: {
                grade: null,
                subject: null,
            },
        }
    },

    methods: {
        handleChange() {
            console.log('changed');
        },
        updateSelectedLession(course, id, lessons) {
            this.selected_courses = {
                course,
                id,
            };
            this.$store.commit("app/UPDATE_LESSION_LISTS", {
                lessions: lessons,
                course: course,
            });

        },
        
        editCourse (value) {
            this.$emit("editCourse",value);
        },

        createCourse () {
            this.$emit("createCourse");
        },
       
        deleteCourse (value) {
            this.$emit("fireDelete",{
                title: "Course",
                id: value.id,
                type: 'course',
            });
        },

        createLessonGroup (value) {
            this.$emit("createLessonGroup",{
                course_id: value.id,
            });
        },

        editCourseLesson (value,course_id) {
            this.$emit("updateLessonGroup",{
                course_id: course_id,
                lession_type: value,
            });
        },

        deleteCourseLesson (value,course_id) {
            this.$emit("fireDelete",{
                title: "Lession Type",
                id: value.id,
                course_id: course_id,
                type: 'lession_type',
            });
        }
    },
    
    computed: {
        subjects: function() {
            let items = this.grades.find((arr) => arr.value === this.filters.grade);
            return items ? items.subjects : [];
        },
        courses: function() {
            let allCourse = JSON.parse(this.$store.state.app.all_courses);

            allCourse = allCourse.filter((arr)=>{
                if (this.filters.grade) return arr.grade === this.filters.grade; 
                else return arr;
            }).filter((arr)=>{
                if (this.filters.subject) return arr.subject === this.filters.subject;
                else return arr;
            });

            return allCourse.sort((a,b)=>{
                return a.position - b.position;
            });
           
        }
    },
    directives: {
        'b-toggle': VBToggle,
        Ripple,

    },
}
</script>