const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    result.innerHTML = "Thank you! I will get back to as soon as possible";
  });