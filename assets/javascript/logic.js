 var config = {
    apiKey: "AIzaSyDghh3abGhkiD3FOuLsRo7WoqgKGia3DKM",
    authDomain: "trainschedule-d7f5d.firebaseapp.com",
    databaseURL: "https://trainschedule-d7f5d.firebaseio.com",
    projectId: "trainschedule-d7f5d",
    storageBucket: "trainschedule-d7f5d.appspot.com",
    messagingSenderId: "988573257477"
  };

  firebase.initializeApp(config);

  var database = firebase.database();

  $("#add-train-btn").on("click", function(event) {
  	event.preventDefault();

  	var trainName = $("#train-input").val().trim(),
  		trainDest = $("#destination-input").val().trim(),
  		trainFirst = $("#first-departure").val().trim(),
  		trainFreq = $("#freq-input").val().trim();

  	var newTrain = {
  		route: trainName,
  		destination: trainDest,
  		routeStart: trainFirst,
  		frequency: trainFreq
  	};

  	database.ref().push(newTrain);

  	console.log(newTrain.route);
  	console.log(newTrain.destination);
  	console.log(newTrain.routeStart);
  	console.log(newTrain.frequency);

  	alert("Route added successfully");

  	$("train-input").val("");
  	$("#destination-input").val("");
  	$("#freq-input").val("");

  	database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  		console.log(childSnapshot.val());

  		var trainName = childSnapshot.val().route;
  		var trainDest = childSnapshot.val().destination;
  		var trainFirst = childSnapshot.val().routeStart;
  		var trainFreq = childSnapshot.val().frequency;

  		var trainFirstConvert = moment(trainFirst, "HH:mm").subtract(1, "years");
  		var currentTime = moment();
  		var timeDiff = moment().diff(moment(trainFirstConvert), "minutes");
  		var tRemainder = timeDiff % trainFreq;

  		//Next Train Arrival
  		var nextArrival = trainFreq - tRemainder;

  		//Next Train
  		var nextTrain = moment().add(nextArrival, "minutes");
  		var nextTrainConvert = moment(nextTrain).format("HH:mm");

  		//add train to schedule
  		//$("#train-table > tbody").append("<tr><td>" + trainName = "</td><td>" + trainDest + "</td><td>" + "Every " + trainFreq + " minutes" + "<td><td>" + nextTrainConvert + "</td><td>" + nextArrival +"</td></tr>");

  	});

  });