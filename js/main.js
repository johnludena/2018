// Kickoff all Foundation JS 
$(document).foundation()

// Initializing WOW.js library
new WOW().init()

// Prevent animations from starting until all assets have been loaded
$('body').addClass('preload');

$(window).on('load', function () {
	$('body').removeClass('preload');
	console.log('window loaded, removing preload class')
})

//  Nodes required for this black magic to happen
var gravatarImage = document.querySelector('.gravatar')
var factContainer = document.querySelector('.fact-bubble')

// Global variables for showRandomFact function
var lastRandom = null
var bubbleTimer = null

// Random facts array for 'About Me' section
var funFacts = ['I grew up in Arequipa, Peru.',
	'I\'m a really good Karaoke singer (but only after 5 beers).',
	'I graduated with a Bachelor of Fine Arts from UHCL.',
	'My dream vacation would be a cruise to Alaska.',
	'The city in Europe I want to visit the most right now is Amsterdam.',
	'I\'m a sucker for good UI.',
	'I want to write & publish a book before 2020.',
	'I\m a total pool shark and will take your lunch money if we play a game.',
	'Ping-pong is the answer to any coding problem.',
	'I\'m not a huge fan of "social" media.',
	'I\'m lactose intolerant, so hold the milk please.',
	'My Mom is from Mexico, and my Dad is from Peru.',
	'I\'m a big fan of minimalism in all aspects of life.',
	'I\'m a total bandwagon Astros fan.',
	'Chipotle is God\'s most perfect food.'
	]


// Function to run upon clicking of my head
var showRandomFact = function(e){
	console.log('You click on my head didn\'t you? Good for you.')

	// If running timeout, clear it first before running another random fact
	if (bubbleTimer !== null) {
		clearTimeout(bubbleTimer)
		console.log('TIMER CLEARED')
	}

	// Get random member of facts array
	var randomNum = Math.floor(Math.random() * funFacts.length)

	// If randomNum is equal to the last shown random fact, re-set randomNum
	while (randomNum === lastRandom) {
		randomNum = Math.floor(Math.random() * funFacts.length)
	}

	// Make lastRandom variable the actual last random number before displaying it
	lastRandom = randomNum

	// Set random array fact as content and remove hidden class
	factContainer.textContent = funFacts[lastRandom]
	factContainer.classList.remove('hidden')


	// Remove random fact after a few seconds
	bubbleTimer = setTimeout(function(){
		console.log('time to go bye bye...')
		factContainer.classList.add('hidden')
	}, 4000)
}

// Event listener my gravatar image
gravatarImage.addEventListener('click', showRandomFact)


$("#ajax-form").submit(function(e) {
	e.preventDefault(); // Prevent a new window from opening upon clicking 'Subscribe now' button

	var formContainer = $('.form-wrapper');
	var formData = $('#ajax-form').serialize(); // Get all form data ready for send off...

	if ($(this).find('[data-invalid]').length >= 1) {
		console.log('empty fields detected, exiting function...');
		return;
	}

	$.ajax({
		type: 'POST', 
		url: $(this).attr('action'), 
		data: formData, 
		dataType: 'json',
		encode: true,
		success: function(data){ // our success callback
		  console.log('SUCCESS! Here\'s the data you just sent:', data);
		  
		  $('body').scrollTop(0);
		  $(formContainer).hide(); // Hide the initial form
		  $('.off-canvas-wrapper').addClass('success');
	      $(".success-message").show(); // Show the checkmark
	      $("svg").addClass("active"); // Start animation of checkmark
		},
		error: function(err){ // our error callback
		  console.log('ERROR! You broke something:', err);
		}
	}) 


}); // end of submit function
