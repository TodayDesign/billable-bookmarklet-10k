(function() {

  const data = [
    { // monday
      billable: 0,
      unbillable: 0
    },
    { // tuesday
      billable: 0,
      unbillable: 0
    },
    { // wednesday
      billable: 0,
      unbillable: 0
    },
    { // thursday
      billable: 0,
      unbillable: 0
    },
    { // friday
      billable: 0,
      unbillable: 0
    }
  ]

  const projects = document.querySelectorAll('.tk-time-tracker-row')
  console.log('projects', projects);

  for(i=0;i<projects.length;++i) {
    const days = projects[i].querySelectorAll('.tk-time-tracker-cel')
    
    for(j=0;j<days.length;++j) {
      console.log('days', days[j].classList);
      if(!days[j].classList.contains('empty')) {
        const hours = parseFloat(days[j].querySelector('.tk-hours').textContent)
        console.log('hours', hours)
        if(days[j].classList.contains('grad-purple')) {
          console.log(`unbillable work ${hours} hours`)
          data[j].unbillable = Number(parseFloat(data[j].unbillable + hours).toFixed(1))
        }
        if(days[j].classList.contains('grad-blue')) {
          console.log(`billable work ${hours} hours`)
          data[j].billable = Number(parseFloat(data[j].billable + hours).toFixed(1))
        }
      }
    }
  }

  const output = `\
Billable this week: ${billablePerWeek(data)}
Mon: ${billablePerDay(data[0])}%;\
Tue: ${billablePerDay(data[1])}%;\
Wed: ${billablePerDay(data[2])}%;\
Thu ${billablePerDay(data[3])}%;\
Fri ${billablePerDay(data[4])}%;\
`

  function billablePerWeek(week) {
    let billable = 0
    let total = 0
    for(i=0;i<week.length;++i) {
      billable = Number((billable + week[i].billable).toFixed(1))
      total = Number((total + (week[i].billable + week[i].unbillable)).toFixed(1))
    }

    return `${fractionToPercent(billable, total)}% (${billable} / ${total})`
  }

  function billablePerDay(day) {
    return fractionToPercent(day.billable, day.billable + day.unbillable)
  }

  function fractionToPercent(top, bottom) {
    if(!top || !bottom) return 0
    return (top / bottom * 100).toFixed(0)
  }

  alert(output);

})();

// Output:
// Billable this week: 85% (34 / 36)
// Mon: 85%; Tue: 80%; Wed: 90%; Thu 85%; Fri 85%;


// .time-entry (dates/hours grid)
// .tk-time-tracker-row (project)
// .tk-time-tracker-cel (has .grad-blue/purple class)
// .tk-hours (hour number)

// foreach day
//   foreach project
//     get monday hours & category
//   total billable hours
//   total unbillable hours

// minify JS https://javascript-minifier.com/
