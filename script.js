const BASE_URL = "https://localhost:44329/StudentsService.asmx"
const ALL_STUDENTS_ENDPOINT = BASE_URL + "/GetAllStudents"
const STUDENTS_BY_AVG_MARK_ENDPOINT = BASE_URL + "/GetStudentsByAverageMark"

function getMarkBounds() {
    return {
        'minMark': document.getElementById("minMark").value || 1.0,
        'maxMark': document.getElementById("maxMark").value || 5.0,
    };
}

function queryPure(url, payload, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    xhr.send(JSON.stringify(payload));
    xhr.onload = () => {
        if (xhr.status != 200) {
            alert(`Error: ${xhr.status}`);
        } else {
            callback(JSON.parse(xhr.response));
        }
    };
}

function queryJquery(url, payload, callback) {
    request = {
        type: "POST",
        url: url,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(payload),
        error: (req, status) => {
            alert(`Error: ${status}`);
        },
    };

    $.ajax(request).done(callback);
}

function populateTable(students) {
    document.getElementById('tableBody').innerHTML = students.map(
        s => `<tr><td>${s.FirstName}</td><td>${s.LastName}</td><td>${s.Patronym}</td><td>${s.AverageMark}</td></tr>`
    ).join("");
}

function getAllStudentsPure() {
    queryPure(ALL_STUDENTS_ENDPOINT, {}, response => populateTable(response.d));
}

function getAllStudentsJquery() {
    queryJquery(ALL_STUDENTS_ENDPOINT, {}, response => populateTable(response.d));
}

function getAllStudentsByAverageMarkPure() {
    queryPure(STUDENTS_BY_AVG_MARK_ENDPOINT, getMarkBounds(), response => populateTable(response.d));
}

function getAllStudentsByAverageMarkJquery() {
    queryJquery(STUDENTS_BY_AVG_MARK_ENDPOINT, getMarkBounds(), response => populateTable(response.d));
}
