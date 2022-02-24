// X
const buttonUp = document.getElementById("x-up")
const buttonDown = document.getElementById("x-down")
const hiddenInputX = document.getElementById("x")
const spanX = document.getElementById("x-span")

buttonUp.addEventListener('click', () => {
    let value = parseFloat(hiddenInputX.value)

    if (value < 2.0) {
        value = value + 0.5
        hiddenInputX.value = value
        spanX.innerHTML = value.toString()
    }
})

buttonDown.addEventListener('click', () => {
    let value = parseFloat(hiddenInputX.value)

    if (value > -2.0) {
        value = value - 0.5
        hiddenInputX.value = value
        spanX.innerHTML = value.toString()
    }
})

// Y
const textInputY = document.getElementById("y")

textInputY.addEventListener("change", () => {
    let value = parseFloat(textInputY.value)

    if (isNaN(value) || value > 5 || value < -5) {
        textInputY.classList.add("error")
    } else textInputY.classList.remove("error")
})

// R
const checkboxArray = []
const hiddenInputR = document.getElementById("r")

for (let i = 1; i <= 5; i++) {
    const checkbox = document.getElementById("r" + i)

    checkboxArray.push(checkbox)

    checkbox.addEventListener('click', (event) => {
        for (let checkbox of checkboxArray) {
            checkbox.checked = false
        }
        event.target.checked = true

        hiddenInputR.value = checkbox.id[1]
    })
}

checkboxArray[0].checked = true

// Form validation, submit / proceed
const INVALID_VALUE = -1
const MISS = 0
const HIT = 1

const form = document.getElementById("form")
const resultTableBody = document.getElementById("results-table-body")

const validateForm = () => {
    if (textInputY.value.length === 0) {
        textInputY.classList.add("error")
        return false
    }

    const x = hiddenInputX.value
    const y = textInputY.value
    const r = hiddenInputR.value

    return (x >= -5 && x <= 5) && (y >= -5 && y <=5) && (r >= 1 && r <= 5)
}

const proceedResponse = (request) => {
    console.log(request.getAllResponseHeaders())
    console.log(request.responseText)

    const response = JSON.parse(request.responseText)
    const row = document.createElement("tr")

    let resultColorClass;

    switch (response.result) {
        case INVALID_VALUE:
            resultColorClass = "results-invalid-value"
            response.result = "некорректные аргументы"
            break
        case MISS:
            resultColorClass = "results-miss"
            response.result = "не в области"
            break
        case HIT:
            resultColorClass = "results-hit"
            response.result = "в области"
            break
    }

    response.time = new Date(parseInt(response.time) * 1000).toLocaleString("ru-RU")
    response.execution += " мкс"

    for (let value of Object.values(response)) {
        const cell = document.createElement("td")
        cell.innerText = value
        row.append(cell)
    }

    row.firstElementChild.classList.add(resultColorClass)
    resultTableBody.prepend(row)
}

form.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!validateForm()) {
        return
    }

    const request = new XMLHttpRequest()
    const formData = new FormData(form)

    request.open("POST", "index.php")
    request.send(formData)

    request.onload = () => {
        proceedResponse(request)
    }
})

