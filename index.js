/* Your Code Here */




let createEmployeeRecord = function (information) {
    return {
        firstName: information[0],
        familyName: information[1], 
        title: information[2],
        payPerHour: information[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

let createEmployeeRecords = function (records) {
    return records.map(record => {
        return createEmployeeRecord(record);
    });
};

let createTimeInEvent = function (timeStamp) {
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(timeStamp.slice(11, 15)),
        date: timeStamp.slice(0, 10)
    });
    return this;
}


let createTimeOutEvent = function (timeStamp) {
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timeStamp.slice(11, 15)),
        date: timeStamp.slice(0, 10)
    });
    return this;
}


let hoursWorkedOnDate = function (dateStamp) {
    let timeIn = this.timeInEvents.find(entry => entry.date === dateStamp);
    timeIn = timeIn.hour;
    let timeOut = this.timeOutEvents.find(entry => entry.date === dateStamp);
    timeOut = timeOut.hour;
    return (timeOut - timeIn) / 100;
};

let wagesEarnedOnDate = function (dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp);
    let payRate = this.payPerHour;
    return hoursWorked * payRate;
}



const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!
    return payable
}

const findEmployeeByFirstName = function (employees, name) {
    return employees.find( employee => employee.firstName === name);
};


const calculatePayroll = function (employees) {
    let totalWages = [];
    employees.forEach( employee => {
        let wage = allWagesFor.call(employee);
        totalWages.push(wage);


    });
    return totalWages.reduce( (accum, curr) => accum + curr, 0);
}   





