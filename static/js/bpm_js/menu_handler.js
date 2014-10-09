$(document).ready(function () {
    $('#start').click(function () {
        var a = new StartActivity("start", "Start Label");
        a.add($('#container'));
    });

    $('#human-task').click(function () {
        var b = new Activity("Human-Task1", "First Human Task");
        b.add($('#container'));
    });
});

