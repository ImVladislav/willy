document.addEventListener('DOMContentLoaded', function() {
    const menuLinks = document.querySelectorAll('.menu a');
    const menuToggler = document.getElementById('menu-toggler');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Add animation class
                targetSection.classList.add('scroll-animation');
                
                // Scroll to the section
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Close the menu
                menuToggler.checked = false;

                // Remove the animation class after the animation is done
                setTimeout(() => {
                    targetSection.classList.remove('scroll-animation');
                }, 1000); // Adjust the time to match your animation duration
            }
        });
    });
});
