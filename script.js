 document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('paymentForm');
  const tableBody = document.querySelector('#paymentTable tbody');

  // Load saved data
  let payments = JSON.parse(localStorage.getItem('payments')) || [];
  payments.forEach((data, index) => addRow(data, index));

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const bloodGroup = document.getElementById('bloodGroup').value;
    const date = document.getElementById('date').value;
    const payment = document.getElementById('payment').value;

    const paymentData = { name, bloodGroup, date, payment };
    payments.push(paymentData);
    localStorage.setItem('payments', JSON.stringify(payments));

    addRow(paymentData, payments.length - 1);
    form.reset();
  });

  function addRow(data, index) {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${data.name}</td>
      <td>${data.bloodGroup}</td>
      <td>${data.date}</td>
      <td>${data.payment}</td>
      <td><button class="delete-btn" data-index="${index}">Delete</button></td>
    `;
    tableBody.appendChild(row);
  }

  // Handle delete using event delegation
  tableBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
      const index = e.target.getAttribute('data-index');
      payments.splice(index, 1); // remove from array
      localStorage.setItem('payments', JSON.stringify(payments)); // update storage
      refreshTable(); // re-render
    }
  });

  function refreshTable() {
    tableBody.innerHTML = '';
    payments.forEach((data, index) => addRow(data, index));
  }
});
