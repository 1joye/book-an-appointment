document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    
    mobileMenuBtn.addEventListener('click', function() {
        navMenu.classList.toggle('show');
    });
    
    // Disease tabs functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const diseaseContents = document.querySelectorAll('.disease-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            diseaseContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Show corresponding content
            const disease = this.getAttribute('data-disease');
            document.getElementById(`${disease}-content`).classList.add('active');
        });
    });
    
    // Appointment form handling
    const appointmentForm = document.getElementById('appointment-form');
    const modal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close-modal');
    const closeConfirmation = document.querySelector('.close-confirmation');
    const appointmentDetails = document.getElementById('appointment-details');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Format appointment details for display
        const detailsHTML = `
            <p><strong>Name:</strong> ${data['full-name']}</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Service:</strong> ${data.service}</p>
            <p><strong>Provider:</strong> ${data.provider}</p>
            <p><strong>Date:</strong> ${data.date}</p>
            <p><strong>Time:</strong> ${data.time}</p>
        `;
        
        // Display details in modal
        appointmentDetails.innerHTML = detailsHTML;
        
        // Show modal
        modal.style.display = 'flex';
        
        // Reset form
        this.reset();
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    closeConfirmation.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navMenu.classList.remove('show');
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Set minimum date for appointment to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('min', today);
});