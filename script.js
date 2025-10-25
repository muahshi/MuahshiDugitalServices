// -----------------------------------------------------------
// 1. Smooth Scrolling 
// -----------------------------------------------------------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// -----------------------------------------------------------
// 2. UPI Payment Modal Logic (Using muahshi7789@ybl)
// -----------------------------------------------------------
const modal = document.getElementById('upi-modal');
const loadingOverlay = document.getElementById('loading-overlay');
const buyButtons = document.querySelectorAll('.buy-button');
const closeButton = document.querySelector('.close-button');
const modalTitle = document.getElementById('modal-title');
const modalPrice = document.getElementById('modal-price');
const upiLink1 = document.getElementById('upi-link-1');
const proofFormLink = document.getElementById('proof-form-link');

// Modal Open Logic
buyButtons.forEach(button => {
    button.addEventListener('click', function() {
        const courseId = this.getAttribute('data-course-id');
        const coursePrice = this.getAttribute('data-course-price');
        const courseName = this.closest('.course-card, .service-card').querySelector('h3').textContent; // Finds name from both sections
        
        // 1. Dynamic Content Update
        modalTitle.textContent = 'Complete Purchase: ' + courseName;
        modalPrice.textContent = '₹' + coursePrice;

        // 2. UPI Link Update (am=amount, tn=transaction note)
        // 🚨 YOUR SPECIFIC UPI ID 🚨
        const upiId = "muahshi7789@ybl"; 
        const baseUpi = `upi://pay?pa=${upiId}&pn=Muahshi&cu=INR`;
        
        // Creating the specific UPI link for this transaction
        upiLink1.href = `${baseUpi}&am=${coursePrice}&tn=Course_${courseId}`;
        
        upiLink1.textContent = `Pay Now (₹${coursePrice})`;
        
        // 3. Proof Form Link Update (IMPORTANT: Aapko Google Form URL set karna hai)
        let formBaseUrl = "YOUR_GOOGLE_FORM_LINK_FOR_PROOF_SUBMISSION"; 
        proofFormLink.href = formBaseUrl;
        
        // Show Modal
        modal.style.display = "block";
    });
});

// Modal Close Logic
closeButton.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


// -----------------------------------------------------------
// 3. Loading Screen Logic
// -----------------------------------------------------------
proofFormLink.addEventListener('click', function(e) {
    // Hide the UPI Modal
    modal.style.display = 'none';

    // Show the Loading/Wait Screen
    loadingOverlay.style.display = 'block';

    // Optional: Keep the screen visible for a period
    setTimeout(() => {
        // You can add logic here to hide it after a long wait, or keep it visible 
        // until the user refreshes or closes the tab.
        console.log("Loading message shown for 10 seconds.");
    }, 10000); 
});
