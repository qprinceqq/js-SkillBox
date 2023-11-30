(function (){
    function sortByText(tag){
        return (a, b) => a[tag].toLowerCase()  > b[tag].toLowerCase()  ? 1 : -1;
    }

    function sortByNum(tag){
        return ((a, b) => Number(a[tag])  - Number(b[tag]));
    }

    function getCurrentAge(date, param) {
        var d = date.split('-');
        date = d[1]+'-'+d[2]+'-'+d[0];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }

    function getCurrentStudyYear(date) {
        var d = date.split('-');
        date = d[2]+'-'+d[1]+'-'+d[0];
        return ((new Date().getTime() - new Date(date)) / (24 * 3600 * 365.25 * 1000)) | 0;
    }
    
    function reverseDate(date){
        let d = date.split("-");
        return d[2] + "-" + d[1] + "-" + d[0];
    }

    function checkDate(year){
        let text = getCurrentStudyYear("01-09-" + String(year)) + 1
        if (text > 4){
            return " (закончил)";
        }
        return " (" + String(text) + " курс)";
    }

    function getStudentItem(studentObj) {
        let tr = document.createElement("tr")
        let fullName = [studentObj.surname, studentObj.name, studentObj.patronymic].join(" ");
        let faculty = studentObj.faculty;
        let birth_date = reverseDate(studentObj.birth_date) + " (" + getCurrentAge(studentObj.birth_date) + " лет)";
        let study_year = String(studentObj.study_year) + " - " + String(Number(studentObj.study_year) + 4) + checkDate(studentObj.study_year);
        for (let x of [fullName, faculty, birth_date, study_year]){
            let td = document.createElement("td");
            td.textContent = x;
            tr.append(td);
        }
        return tr;
    }

    function createFilterBtn(table){
        let div = document.getElementById("contanier-filter");
        let button = document.getElementById("btn-filter");
        let fl = true;
        button.addEventListener("click", function(){
            if (fl){
                let search = document.createElement("input");
                let select = document.createElement("select");
                let optionList = ["ФИО", "факультет", "год начала обучения", "год окончания обучения"];
                for (let i of optionList){
                    let option = document.createElement("option");
                    option.textContent = i;
                    select.append(option);
                }
                search.addEventListener("input", function(){
                    filterTableBySearch(table, search.value, select.selectedIndex);
                })
                div.append(search);
                div.append(select);
                fl = false
            }
            else{
                fl = true
                div.children[1].remove();
                div.children[1].remove();
            }
        });
    }
    function createFilterTable(table){
        let filterFio = document.getElementById("filter-fio");
        let filterFaculty = document.getElementById("filter-faculty");
        let filterBDate = document.getElementById("filter-birth-date");
        let filterSYear = document.getElementById("filter-study-year");
        filterFio.addEventListener("click", function(){
            students.sort((a, b) => (a.surname + a.name + a.patronymic).toLowerCase() > (b.surname + b.name + b.patronymic).toLowerCase()  ? 1 : -1);
            table.innerHTML = "";
            for (let student of students){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        filterBDate.addEventListener("click", function(){
            students.sort(sortByText("birth_date"));
            table.innerHTML = "";
            for (let student of students){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        filterFaculty .addEventListener("click", function(){
            students.sort(sortByText("faculty"));
            table.innerHTML = "";
            for (let student of students){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
        filterSYear.addEventListener("click", function(){
            students.sort(sortByNum("study_year"));
            table.innerHTML = "";
            for (let student of students){
                let tr = getStudentItem(student);
                table.append(tr);
            }

        });
    }

    function filterTableBySearch(table, toFilter, act){
        let filteredStudents;
        if (act === 0){
            filteredStudents = students.filter(student => 
                student.surname.toLowerCase().startsWith(toFilter.toLowerCase()) ||
                student.name.toLowerCase().startsWith(toFilter.toLowerCase()) ||
                student.patronymic.toLowerCase().startsWith(toFilter.toLowerCase())
            )
        }
        else if (act === 1){
            cfilteredStudents = students.filter(student => 
                student.faculty.toLowerCase().startsWith(toFilter.toLowerCase())
            )
        }
        else if (act === 2){
            filteredStudents = students.filter(student => 
                toFilter === "" || student.study_year === toFilter
            )
        }
        else{
            filteredStudents = students.filter(student => 
                toFilter === "" || Number(student.study_year) + 4 === Number(toFilter)
            )
        }
        for (let student of filteredStudents){
            table.innerHTML = "";
            let tr = getStudentItem(student);
            table.append(tr);
        } 
    }

    function renderStudentsTable(students) {
        let table = document.getElementById("table-body");
        let form = document.getElementById("main-form");
        createFilterBtn(table);
        createFilterTable(table);
        
        form.addEventListener('submit', function(e){
            e.preventDefault();
            let birth_date = document.getElementById("birth-date").value;
            let name = document.getElementById("name").value;
            let surname = document.getElementById("surname").value;
            let patronymic = document.getElementById("patronymic").value;
            let study_year = document.getElementById("study-year").value;
            let faculty = document.getElementById("faculty").value;
            table.append(getStudentItem({
                surname: surname,
                name : name,
                patronymic: patronymic,
                birth_date: birth_date,
                study_year: study_year,
                faculty: faculty
            }))
            students.push({
                surname: surname,
                name : name,
                patronymic: patronymic,
                birth_date: birth_date,
                study_year: study_year,
                faculty: faculty
            })
        });

    }
    document.addEventListener('DOMContentLoaded', function() {
        renderStudentsTable(students);
    });
    let students = [];
})();