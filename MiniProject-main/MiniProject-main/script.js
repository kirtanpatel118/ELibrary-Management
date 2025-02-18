document.addEventListener("DOMContentLoaded", function () {
        // Get the current page's URL path
        var currentPath = window.location.pathname.split("/").pop();

        // Mapping of pages to their corresponding nav link IDs
        var pageToNavLinkMap = {
                "index.html": "home-link",
                "about.html": "about-link",
                "gallery.html": "gallery-link",
                "contact.html": "contact-link"
                // Add more mappings as needed
        };

        // Remove 'active' class from all nav links
        document.querySelectorAll(".navbar-nav .nav-link").forEach(function (link) {
                link.classList.remove("active");
        });

        // Add 'active' class to the current page's nav link
        if (pageToNavLinkMap[currentPath]) {
                document.getElementById(pageToNavLinkMap[currentPath]).classList.add("active");
        }
});





document.addEventListener('DOMContentLoaded', function() {
    // Get the modal
    var popup = document.getElementById('login-popup');

    // Get the button that opens the modal
    var btn = document.getElementById('open-login');

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName('close-btn')[0];

    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        popup.style.display = 'block';
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        popup.style.display = 'none';
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == popup) {
            popup.style.display = 'none';
        }
    }

    // Handle tab switching
    const tabs = document.querySelectorAll('.tab-btn');
    const sections = document.querySelectorAll('.form-section');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const target = this.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            // Hide all form sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to the clicked tab
            this.classList.add('active');
            // Show the corresponding form section
            document.getElementById(target).classList.add('active');
        });
    });
});



