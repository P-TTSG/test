// Function to handle review popup
const reviewButtons = document.querySelectorAll('.review-btn');
const popup = document.getElementById('reviewPopup');
const closeBtn = document.querySelector('.close');
const submitBtn = document.getElementById('submitReview');
let selectedStore = '';

reviewButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        selectedStore = btn.getAttribute('data-store');
        popup.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

submitBtn.addEventListener('click', () => {
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.querySelector('input[name="rating"]:checked').value;
    if (reviewText && rating) {
        fetch('/submit-review', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                store: selectedStore,
                review: reviewText,
                rating: rating,
            }),
        })
        .then(response => response.json())
        .then(data => {
            alert('รีวิวของคุณถูกส่งแล้ว!');
            popup.style.display = 'none';
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('กรุณาเขียนรีวิวและเลือกคะแนนดาวก่อนส่ง');
    }
});

// Close popup when clicking outside of the popup content
window.onclick = function(event) {
    if (event.target == popup) {
        popup.style.display = 'none';
    }
}
