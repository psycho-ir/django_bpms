/**
 * Created by soroosh on 10/7/14.
 */

function StartActivity(name, label_name) {
    this.name = name;
    this.label_name = label_name;
    this.activity = null;
}

StartActivity.prototype.get_object = function () {
    if (this.activity) {
        return this.activity;
    }
    _activity_id = 'activity_' + this.name;

    var _activity = $('<div>').attr('data-shape', 'Circle').attr('id', _activity_id).addClass('activity');
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
        jsPlumb.detachAllConnections($(this));
        $(this).remove();
        e.stopPropagation();
    });


    this.activity = _activity;
    return this.activity;
}

StartActivity.prototype.add = function (container) {
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

    jsPlumb.addEndpoint(_activity_id, endpointOptionsSource);
}


