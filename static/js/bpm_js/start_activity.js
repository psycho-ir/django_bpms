/**
 * Created by soroosh on 10/7/14.
 */

function StartActivity(name, label_name) {
    if (window.activities[name]) {
        throw 'Currently you have an activity with this name!';
    }
    this.name = name;
    this.label_name = label_name;
    this.activity = null;
    this.activity_id = 'activity_' + this.name;
    this.end_points = []
}

StartActivity.prototype.get_object = function () {
    var obj = this;
    if (this.activity) {
        return this.activity;
    }

    var _activity = $('<div>').attr('data-shape', 'Circle').attr('id', this.activity_id).addClass('activity');
    _activity._obj = this;
    var connect = $('<div>').addClass('connect');
//    _activity.append($('<div>').text(this.label_name));
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

StartActivity.prototype.add = function (container) {
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

    this.end_points.push(jsPlumb.addEndpoint(this.activity_id, endpointOptionsSource));
}


