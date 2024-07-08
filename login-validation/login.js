var form;
var user;
var area;
var pin;
var login_details = [];
var require = "";
var indexed = 0;
var validated = false;

var addit = document.querySelector(".add")
addit.classList.remove("d-none")

var updateit = document.querySelector(".update")

var output = document.querySelector(".show")
function add() {
    validation()
    if (validated) {
        login_details.push({ name: user, location: area, pincode: pin })
        display()
    }
    reset();
}
function validation() {
    form = document.forms['formdata']
    user = form['user'].value
    area = form['area'].value
    pin = form['pin'].value
    if (!user) require += "Name, "
    if (!area) require += "Area, "
    if (!pin) require += "Pincode, "
    require = require.slice(0, -2);
    if (!user && !area && !pin) alert(`Required: Name, Area And Pincode!`)
    else if (require) alert(`Requred: ${require}`)
    if (!require) {
        validated = true
    } else {
        validated = false
    }
}
function display() {
    const mytable = document.createElement("table");
    mytable.className = "mytable"

    const th0 = document.createElement("th");
    th0.textContent = "Name"
    th0.className = "th"

    const th1 = document.createElement("th")
    th1.textContent = "Area"
    th1.classList.add("th")

    const th2 = document.createElement("th")
    th2.textContent = "Pincode"
    th2.setAttribute("class", "th")

    const th3 = document.createElement("th")
    th3.textContent = "Action"
    th3.classList.add("th")

    const myrow = document.createElement("tr")
    myrow.appendChild(th0)
    myrow.appendChild(th1)
    myrow.appendChild(th2)
    myrow.appendChild(th3)
    myrow.classList.add('row')

    mytable.appendChild(myrow)


    login_details.forEach((e, i, o) => {
        output.innerHTML = ""
        const row = document.createElement("tr")
        const td0 = document.createElement("td")
        td0.classList.add('td')
        td0.textContent = e.name

        const td1 = document.createElement("td")
        td1.classList.add('td')
        td1.textContent = e.location

        const td2 = document.createElement("td")
        td2.classList.add('td')
        td2.textContent = e.pincode

        const td3 = document.createElement("td")
        td3.classList.add("td")
        td3.innerHTML = `<button onclick=edit('${e.name}','${e.location}','${e.pincode}')>Edit</button> <button onclick=deleteing('${e.name}','${e.location}','${e.pincode}')>Delete</delete`

        row.appendChild(td0)
        row.appendChild(td1)
        row.appendChild(td2)
        row.appendChild(td3)


        mytable.appendChild(row)

        output.appendChild(mytable)

    })
    reset()
}
function edit(name, area, pincode) {
    addit.classList.add("d-none")
    updateit.classList.remove("d-none")
    indexed = login_details.findIndex((e) => { return e.name === name })
    alert(indexed)
    form['user'].value = name
    form['area'].value = area
    form['pin'].value = pincode

    // console.log(indexed, name, area, pincode);
}

function update() {
    validation()
    if (validated) {
        alert(indexed)
        login_details.forEach((e, i) => {
            if (i === indexed) {
                console.log(e);
                e.name = user
                e.location = area
                e.pincode = pin
            }
        })
        display()
        addit.classList.remove("d-none")
        updateit.classList.add("d-none")
    }
    reset()
}

function deleteing(name, location, pincode) {
    indexed = login_details.findIndex((e, i, o) => { return e.name === name })
    alert(indexed)
    login_details.splice(indexed, 1)
    output.innerHTML = ""
    display()
    console.log(login_details);
}

function reset() {
    require = ""
    document.querySelector("form").reset()
}