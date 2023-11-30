(function (){
    function getStudentItem(studentObj) {
        let tr = document.createElement("tr")
        let fullName = [studentObj.surname, studentObj.name, studentObj.patronymic].join(" ");
        let faculty = studentObj.faculty;
        let birth_date = `${getDate(studentObj.birth_date)} (${getCurrentAge(studentObj.birth_date)} лет)`;
        let study_year = `${studentObj.study_year} - ${Number(studentObj.study_year) + 4} (${checkStudy(studentObj.study_year)})`;
        for (let x of [fullName, faculty, birth_date, study_year]){
            let td = document.createElement("td");
            td.textContent = x;
            tr.append(td);
        }
        return tr;
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

    function createFilterBtn(table){
        let div = document.getElementById("contanier-filter");
        let button = document.getElementById("btn-filter");
        let flag = true;
        button.addEventListener("click", function(){
            if (flag){
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
                flag = false
            }
            else{
                flag = true
                div.children[1].remove();
                div.children[1].remove();
            }
        });
    }

    function filterTableBySearch(table, toFilter, act){
        if (!toFilter) return
        let filteredStudents;
        if (act === 0){
            filteredStudents = students.filter(student => 
                student.surname.toLowerCase().startsWith(toFilter.toLowerCase()) ||
                student.name.toLowerCase().startsWith(toFilter.toLowerCase()) ||
                student.patronymic.toLowerCase().startsWith(toFilter.toLowerCase())
            )
        }
        else if (act === 1){
            filteredStudents = students.filter(student => 
                student.faculty.toLowerCase().startsWith(toFilter.toLowerCase())
            )
        }
        else if (act === 2){
            filteredStudents = students.filter(student => 
                student.study_year === toFilter
            )
        }
        else{
            filteredStudents = students.filter(student => 
                Number(student.study_year) + 4 === Number(toFilter)
            )
        }
        for (let student of filteredStudents){
            table.innerHTML = "";
            let tr = getStudentItem(student);
            table.append(tr);
        } 
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

    function sortByText(tag){
        return (a, b) => a[tag].toLowerCase()  > b[tag].toLowerCase()  ? 1 : -1;
    }

    function sortByNum(tag){
        return ((a, b) => Number(a[tag])  - Number(b[tag]));
    }

    function getCurrentAge(date) {
        return (new Date().getTime() - new Date(getDate(date, 0))) / (24 * 3600 * 365.25 * 1000) | 0
    }

    function getCurrentStudyYear(date) {
        return (new Date().getTime() - new Date(getDate(date, 1))) / (24 * 3600 * 365.25 * 1000) | 0
    }
    
    function getDate(date, act){
        let d = date.split("-");
        if (act === 1) return `${d[2]}-${d[1]}-${d[0]}`
        return `${d[1]}-${d[2]}-${d[0]}`
    }

    function checkStudy(year){
        let study = getCurrentStudyYear(`01-09-${year}`) + 1
        if (study > 4){
            return "закончил";
        }
        return `сейчас на ${study} курс`;
    }

    let students = [];
    document.addEventListener('DOMContentLoaded', function() {
        renderStudentsTable(students);
    });
    
})();