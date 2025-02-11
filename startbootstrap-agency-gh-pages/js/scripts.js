/*!
* Start Bootstrap - Agency v7.0.12 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    //  Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

   // Get the canvas element and its context
const canvas = document.getElementById("tunerCanvas");
const ctx = canvas.getContext("2d");

// Variables for the tuner animation
let needleAngle = 0; // Angle of the needle
let targetAngle = 0; // Target angle for the needle to move toward
const centerX = canvas.width / 2; // Center of the canvas
const centerY = canvas.height / 2; // Center of the canvas
const needleLength = 120; // Length of the needle

// Function to draw the tuner
function drawTuner() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the tuner background (a semi-circle)
  ctx.beginPath();
  ctx.arc(centerX, centerY, 150, Math.PI, 0, false); // Semi-circle
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Draw the needle
  ctx.save();
  ctx.translate(centerX, centerY); // Move the origin to the center
  ctx.rotate(needleAngle); // Rotate the needle
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(needleLength, 0);
  ctx.strokeStyle = "red";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  // Animate the needle toward the target angle
  needleAngle += (targetAngle - needleAngle) * 0.1;

  // Request the next frame
  requestAnimationFrame(drawTuner);
}

// Function to simulate a frequency change (for demonstration)
function simulateFrequencyChange() {
  // Randomly change the target angle for the needle
  targetAngle = (Math.random() - 0.5) * Math.PI; // Random angle between -90° and 90°
}

// Start the tuner animation
drawTuner();

// Simulate frequency changes every 2 seconds
setInterval(simulateFrequencyChange, 2000);

});
