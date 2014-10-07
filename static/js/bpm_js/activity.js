/**
 * Created by soroosh on 10/7/14.
 */

window.activities = {}

function Activity(name, label_name, type) {
    this.name = name;
    this.label_name = label_name;
    this.type = type;
    this.activity = null;
}

Activity.prototype.get_object = function () {
    if (this.activity) {
        return this.activity;
    }
    _activity_id = 'activity_' + this.name;

    var _activity = $('<div>').attr('id', _activity_id).addClass('human-activity');
    var connect = $('<div>').addClass('connect');
    _activity.append($('<div>').text(this.label_name));
    _activity.css({
                      'top': 100,
                      'left': 100
                  });
    _activity.append(connect);
    jsPlumb.draggable(_activity, {
        containment: 'parent',
        stop: function (event) {
            console.log('Item dragged!');
        }
    });

//    jsPlumb.makeTarget(_activity, {
//        anchor: ["Continuous", { faces: [ "bottom" ] } ],
//        paintStyle: { fillStyle: "red" }
//    });
//
//    jsPlumb.makeSource(connect, {
//        parent: _activity,
//        anchor: ["Continuous", { faces: [ "bottom" ] } ],
//        paintStyle: { fillStyle: "purple" }
//    });


    _activity.dblclick(function (e) {
        jsPlumb.detachAllConnections($(this));
        $(this).remove();
        e.stopPropagation();
    });


    this.activity = _activity;
    return this.activity;
}

Activity.prototype.add = function (container) {
    _activity_id = 'activity_' + this.name;
    var object = this.get_object();
    if (window.activities[this.name]) {
        alert('you cannot add an activity more than one time!')
        return;
    }
    window.activities[this.name] = object;
    container.append(object);
    var endpointOptionsSource = {
        isSource: true,
        endpoint: [ "Rectangle", { width: 10, height: 20 } ],
        style: {color: 'blue'},
        maxConnections: -1,
        connector: "Straight",
        anchor: "RightMiddle",
        connectorStyle: { lineWidth: 3, strokeStyle: 'green' },
        scope: "blueline",
        dropOptions: {
            drop: function (e, ui) {
                alert('drop!');
            }
        }

    };

    var endpointOptionsTarget = {
        isTarget: true,
        endpoint: [ "Dot", { radius: 4 } ],
        style: {color: 'green'},
        maxConnections: -1,
        connector: "Straight",
        anchor: "LeftMiddle",
        connectorStyle: { lineWidth: 3, strokeStyle: 'green' },
        scope: "blueline",
        dropOptions: {
            "drop:hit": function (e, ui) {
                alert('drop!');
            }
        }

    };


    jsPlumb.addEndpoint(_activity_id, endpointOptionsSource);
    jsPlumb.addEndpoint(_activity_id, endpointOptionsTarget);
}

