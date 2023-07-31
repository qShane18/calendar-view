const month_year = document.querySelector('.month-year');
const dates_ul = document.querySelector('.dates');
const Months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const previousMonth_btn = document.querySelector('.previous-month-btn');
const nextMonth_btn = document.querySelector('.next-month-btn');

let currentDateOnBoard;

updateCalendarDisplay(new Date());
previousMonth_btn.addEventListener('click', () => {

    let previousMonthDate;
    if(currentDateOnBoard.getMonth() == 0)
        previousMonthDate = new Date(currentDateOnBoard.getFullYear() - 1, 11);
    else 
        previousMonthDate = new Date(currentDateOnBoard.getFullYear(), currentDateOnBoard.getMonth() - 1);
    updateCalendarDisplay(previousMonthDate);
})
nextMonth_btn.addEventListener('click', () => {

    let nextMonthDate;
    if(currentDateOnBoard.getMonth() == 11)
        nextMonthDate = new Date(currentDateOnBoard.getFullYear() + 1, 0, 1);
    else 
        nextMonthDate = new Date(currentDateOnBoard.getFullYear(), currentDateOnBoard.getMonth() + 1, 1);
    updateCalendarDisplay(nextMonthDate);
})



function updateCalendarDisplay(date) {
    // clearing the board
    dates_ul.innerHTML = ``;

    // set the currentDateOnBoard
    currentDateOnBoard = date; 

    const curYear = date.getFullYear();
    const curMonth = date.getMonth();
    const daysInCurrentMonth = daysInMonth(curMonth, curYear);


    // adding Month and Year to header
    month_year.innerText = `${Months[curMonth]} ${curYear}`
    // adding previous month dates to grid
    let daysInPreviousMonth;
    if(curMonth > 0) 
        daysInPreviousMonth = daysInMonth(curMonth - 1, curYear, 1)
    else
        daysInPreviousMonth = daysInMonth(11, date.getFullYear() - 1, 1)

    for(let i = daysInPreviousMonth - (new Date(curYear, curMonth, 1).getDay()) + 1; i <= daysInPreviousMonth; i++) {
        const date_li = document.createElement('li');
        date_li.innerText = i;
        date_li.classList.add('date');
        date_li.classList.add('previous-month-date');
        dates_ul.append(date_li);
    }
    // adding Dates to calendar to grid
    const actualCurDate = new Date();
    let dateOnBoard = date;
    for(let i = 1; i <= daysInCurrentMonth; i++) {
        dateOnBoard.setDate(i);
        const date_li = document.createElement('li');
        date_li.innerText = i;
        date_li.classList.add('date');
        if(actualCurDate.toDateString() === date.toDateString()) date_li.classList.add('current-date');
        dates_ul.append(date_li);
    }

    // adding next month dates
    for(let i = 1; i <= 7 - (new Date(curYear, curMonth, daysInCurrentMonth).getDay()) - 1; i++) {
        const date_li = document.createElement('li');
        date_li.innerText = i;
        date_li.classList.add('date');
        date_li.classList.add('next-month-date');
        dates_ul.append(date_li);
    }
}
function daysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
}
