/**
 * Created by soroosh on 10/7/14.
 */

window.activities = {}

function Activity(name, label_name, type) {
    if (window.activities[name]) {
        throw 'you cannot add an activity more than one time!';
    }
    this.name = name;
    this.label_name = label_name;
    this.type = type;
    this.activity = null;
    this.activity_id = 'activity_' + this.name;
    this.end_points = []
}

Activity.prototype.get_object = function () {
    console.log(this);
    obj = this;
    if (this.activity) {
        return this.activity;
    }

    var _activity = $('<div>').attr('id', this.activity_id).addClass('human-activity');
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


    _activity.dblclick(function (e) {
        jsPlumb.deleteEndpointsOnDetach = true;
        jsPlumb.detachAllConnections($(this));
        $(this).remove();
        console.log(obj.end_points);
        for (var i = 0; i < obj.end_points.length; i++) {
            console.log(obj.end_points[i]);
            jsPlumb.deleteEndpoint(obj.end_points[i]);
        }
        obj.end_points = []
        delete window.activities[obj.name];
        e.stopPropagation();
    });


    this.activity = _activity;
    return this.activity;
}

Activity.prototype.add = function (container) {
    var object = this.get_object();
    window.activities[this.name] = object;
    container.append(object);
    var endpointOptionsSource = {
        isSource: true,
        endpoint: [ "Dot", { radius: 4 } ],
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


    this.end_points.push(jsPlumb.addEndpoint(this.activity_id, endpointOptionsSource));
    this.end_points.push(jsPlumb.addEndpoint(this.activity_id, endpointOptionsTarget));
}

