function addZero (num) {
    if (num < 10) {
        return `0${num}`;
    } else { return num; }
}

function timer(id, deadline) {

    function dateCalculation (date) {

        const totalDate = Date.parse(date) - Date.parse(new Date()),
              days = Math.floor(totalDate / (1000 * 60 * 60 * 24)),
              hours = Math.floor(totalDate / (1000 * 60 * 60) % 24),
              minutes = Math.floor(totalDate / (1000 * 60) % 60),
              seconds = Math.floor(totalDate / 1000 % 60);
        return {
            'total': totalDate,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setClock (selector, endDate) {
        
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateTime, 1000);

        updateTime();

        function updateTime () {
            const newDate = dateCalculation(endDate);
            days.textContent = addZero(newDate.days);
            hours.textContent = addZero(newDate.hours);
            minutes.textContent = addZero(newDate.minutes);
            seconds.textContent = addZero(newDate.seconds);
            const total = newDate.total;

            if (total <= 0) {
                clearInterval(timerInterval);
            }
        }
    }

    setClock(id, deadline);
}

export default timer;
export {addZero};