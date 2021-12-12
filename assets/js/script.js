// array for holding the current tasks
var tasks = [];

// gets the current time and sets the pages date
var currentTime = moment().format("H")
var today = moment().format("LL");
document.getElementById("currentDay").innerText = today;

// sets the days tasks if any are saved
function initialize()
{
    backgroundUpdate();
    tasks = JSON.parse(localStorage.getItem("WorkSchedule"));

    if (!tasks)
    {
        tasks = [];
    }

    console.log(tasks);
    for (var i = 0; i < tasks.length; i++)
    {
        if(today === tasks[i].day){
            createTask(tasks[i].text, tasks[i].time)
        }
    }
};

// updates task background based on the current time
function backgroundUpdate()
{
    for (var i = 1; i < 10; i++)
    {
        var t = i + 8;
        if (currentTime > t)
        {
            $(`#row${i} textarea`).addClass("past")
        } else if (currentTime < t)
        {
            $(`#row${i} textarea`).addClass("future")
        } else
        {
            $(`#row${i} textarea`).addClass("present")
        }
    }
};

// loads/creates task
function createTask(text, time)
{
    // time is -8 as the schedule starts at 9am
    var t = time - 8;
    console.log("huh" + time);
    $(`#row${t} textarea`).val(text);
};

// saves schedule to local storage
function saveSchedule()
{
    localStorage.setItem("WorkSchedule", JSON.stringify(tasks));
};

// save button
$(".saveBtn").click(function ()
{
    var task = $(this).siblings('textarea').val();
    var hour = $(this).siblings('p').text();

    tasks.push({
        text: task,
        time: hour,
        day: today
    })

    saveSchedule();
});

//loads page data
initialize();