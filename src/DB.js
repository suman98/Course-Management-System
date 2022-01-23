let grades = [{
        value: null,
        text: "Please select grades",
        subjects: [{ value: null, text: "Please Select subjects" }]
    },

    {
        value: 'A',
        text: "Primary",
        subjects: [
            { value: 1, text: 'English' },
            { value: 2, text: 'Math' },
            { value: 3, text: 'Science' },
        ],
    },
    {
        value: 'B',
        text: "Secondary",
        subjects: [
            { value: 1, text: 'Computer' },
            { value: 2, text: 'Hackathon' },
            { value: 3, text: 'Others Specific' },
        ],
    },
    {
        value: 'C',
        text: "Bachelor",
        subjects: [
            { value: 1, text: 'C Programming' },
            { value: 2, text: 'Operating System' },
            { value: 3, text: 'Advanced Java' },
        ],
    },
];


let domains = [{
        value: null,
        text: "Please select domain"
    },
    {
        value: 'A',
        text: "Example A",
    },
    {
        value: 'B',
        text: "Example B",
    },
    {
        value: 'C',
        text: "Example C",
    }

];

let standards = [{
        value: null,
        text: "Please select standard"
    },
    {
        value: 'A',
        text: "Standard A",
    },
    {
        value: 'B',
        text: "Standard B",
    },
    {
        value: 'C',
        text: "Standard C",
    }

];


let courses = [{
    "id": 1,
    "position": 1,
    "name": "test course",
    "subject": "test subject",
    "grade": 'A',
    "lessions_types": [{
        "id": 1,
        "name": "test Lessions",
        "lessions": [{
            "id": 1,
            "lession_name_file": "",
            "lession_name": "ssss",
            "domain": "www.google.com",
            "pass_percentage": "100 %",
            "access_type": "Trail",
            "live_link": "N/A",
            "pdf": "None"
        }]
    }]
}];




let DB;
export default DB = {
    courses,
    grades,
    domains,
    standards
};