export function getDate() {
    const today = new Date();

    const date =
        today.getFullYear() +
        "-" +
        String(today.getMonth() + 1).padStart(2, "0") +
        "-" +
        String(today.getDate()).padStart(2, "0");

    return date
}

export function dateReverse(date) {
    return date.split("-").reverse().join("-")
}

export function isDate(date) {
    const regex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/
    return date.match(regex)
}

export function caplitalize(string) {
    if(string.length == 0) {
        return string
    }
    return [string[0].toUpperCase(), ...string.slice(1, string.length)].join("")
}

export function writeFile(name, data, callback=()=>{}) {
    fetch(`http://localhost:5000/write/${name}`, {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    }).then(res => {
        return res.json()
    }).then(callback)
}
