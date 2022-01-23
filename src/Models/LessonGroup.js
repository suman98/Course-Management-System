const createLessonGroup = ({ value }) => {
    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let course = db.find((arr) => arr.id === value.course_id);

    course['position'] = db.findIndex((arr) => arr.id === value.course_id);

    let record = {
        id: Math.random(),
        name: value.name,
        lessions: [],
    };

    course.lessions_types.push(record);
    db = db.filter((arr) => arr.id !== course.id);
    db.push(course);
    let new_db = JSON.stringify(db)

    localStorage.setItem("courses", new_db);
    return new_db;
};


const updateLessonGroup = ({ value }) => {
    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let course = db.find((arr) => arr.id === value.course_id);
    course['position'] = db.findIndex((arr) => arr.id === value.course_id);
    let record = {
        ...value,
        name: value.name,
    };
    course.lessions_types = course.lessions_types.filter((arr) => arr.id !== value.id);
    course.lessions_types.push(record);
    db = db.filter((arr) => arr.id !== course.id);

    db.splice(course['position'], 0, ...[course]);

    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return new_db;
};


const destroyLessonGroup = ({ value }) => {
    let db = localStorage.getItem('courses') || "[]";
    db = JSON.parse(db);
    let course = db.find((arr) => arr.id === value.course_id);
    course['position'] = db.findIndex((arr) => arr.id === value.course_id);
    let record = {
        ...value,
        name: value.name,
    };

    course.lessions_types = course.lessions_types.filter((arr) => arr.id !== value.id);
    db = db.filter((arr) => arr.id !== course.id);
    db.splice(course['position'], 0, ...[course]);

    let new_db = JSON.stringify(db);
    localStorage.setItem("courses", new_db);
    return new_db;
};


export { createLessonGroup, updateLessonGroup, destroyLessonGroup }