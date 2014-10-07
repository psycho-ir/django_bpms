
$(document).ready(function () {
    $('#start').click(function () {
        new StartActivity("start","Start Label").add($('#container'));
    });

    $('#human-task').click(function(){
        new Activity("Human-Task1","First Human Task").add($('#container'));
    });
});

