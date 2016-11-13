 Template.index.helpers({
    		tasks: function () {
      			return Tasks.find({}, { sort: {createdAt: -1}});
      			if (Session.get("hideCompleted")) {
        // If hide completed is checked, filter tasks
        		return Tasks.find({checked: {$ne: true}}, {sort: {createdAt: -1}});
     			} else {
        // Otherwise, return all of the tasks
        		return Tasks.find({}, {sort: {createdAt: -1}});
     			 }
   		 },
    		hideCompleted: function () {
      			return Session.get("hideCompleted");
    		},
   		 incompleteCount: function () {
      			return Tasks.find({checked: {$ne: true}}).count();
 	 }
});

 Template.index.events({
  	 "click .emoji": function (event) {
      // Prevent default browser form submit
      		event.preventDefault();
		// Get value from form element
	console.log(event.currentTarget.textContent)
      var value = event.currentTarget.value;
 	if(value == 0){ text = "very sad" }
 	if(value == 1){ text = "sad" }
 	if(value == 2){ text = "confused" }
 	if(value == 3){ text = "normal" }
 	if(value == 4){ text = "calm" }
 	if(value == 5){ text = "happy" }
 	if(value == 6){ text = "excited" }
      // Insert a task into the collection

	Tasks.insert({
        text: text,
	value:value,
        createdAt: new Date(),            // current time
        owner: Meteor.userId(),           // _id of logged in user
        username: Meteor.user().username  // username of logged in user
      });
 
      },
    		"change .hide-completed input": function (event) {
     		 Session.set("hideCompleted", event.target.checked);
    }
  });
 Template.task.events({
    		"click .toggle-checked": function () {
      // Set the checked property to the opposite of its current value
      		Tasks.update(this._id, {
       		$set: {checked: ! this.checked}
      });
    },
   		 "click .delete": function () {
      		Tasks.remove(this._id);
    }
  });
 Accounts.ui.config({
    passwordSignupFields: "USERNAME_ONLY"
  });

Template.graph.topGenresChart = function() {
    return {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        title: {
            text: Meteor.user().username + "'s top genres"
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    },
                    connectorColor: 'silver'
                }
            }
        },
        series: [{
            type: 'area',
            name: 'genre',
            data: [
		['very-sad',  0],
                ['sad',       1],
		['calm',      2],
                ['happy',     5],
		['confused',  3],
                ['excited',   6],
		['normal',    4],
		['calm',      2]
            ]
        }]
    };
};
