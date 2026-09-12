const apiUrl = 'http://localhost:3000';

// When page loads
document.addEventListener('DOMContentLoaded', function() {
    getUsers();
});


// Add user
const appointmentForm = document.getElementById('appointmentForm');

appointmentForm.addEventListener('submit', function(event) {

    event.preventDefault();

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;

    const userDetails = {
        name: name,
        phone: phone,
        email: email
    };

    fetch(`${apiUrl}/user/add-user`, {

        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(userDetails)

    })

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        const message = document.getElementById('message');

        if (data.id) {

            message.innerText =
                `Appointment booked successfully! Your ID is ${data.id}`;

            message.style.color = '#28a879';

            appointmentForm.reset();

            getUsers();

        } else {

            message.innerText = data.message;

            message.style.color = '#e74c3c';
        }

    })

    .catch(function(error) {

        console.log(error);

        const message = document.getElementById('message');

        message.innerText = 'Unable to connect to server';

        message.style.color = '#e74c3c';

    });

});


// Get all users
function getUsers() {

    fetch(`${apiUrl}/user/get-users`)

    .then(function(response) {
        return response.json();
    })

    .then(function(users) {

        displayUsers(users);

    })

    .catch(function(error) {

        console.log(error);

        document.getElementById('usersContainer').innerHTML = `
            <div class="no-users">
                Unable to load appointments.
            </div>
        `;

    });
}


// Display users
function displayUsers(users) {

    const usersContainer = document.getElementById('usersContainer');

    usersContainer.innerHTML = '';

    if (users.length === 0) {

        usersContainer.innerHTML = `
            <div class="no-users">
                No appointments found.
            </div>
        `;

        return;
    }

    for (let i = 0; i < users.length; i++) {

        const user = users[i];

        const firstLetter = user.name.charAt(0).toUpperCase();

        const userCard = document.createElement('div');

        userCard.className = 'user-card';

        userCard.innerHTML = `
            <div class="user-top">

                <div class="user-avatar">
                    ${firstLetter}
                </div>

                <div>
                    <h3>${user.name}</h3>
                </div>

            </div>

            <p>📞 ${user.phone}</p>

            <p>✉️ ${user.email}</p>

            <button
                class="delete-button"
                onclick="deleteUser(${user.id})">
                Delete Appointment
            </button>
        `;

        usersContainer.appendChild(userCard);
    }
}


// Delete user
function deleteUser(id) {

    const confirmDelete = confirm(
        'Are you sure you want to delete this appointment?'
    );

    if (!confirmDelete) {
        return;
    }

    fetch(`${apiUrl}/user/delete-user/${id}`, {

        method: 'DELETE'

    })

    .then(function(response) {
        return response.json();
    })

    .then(function(data) {

        console.log(data);

        getUsers();

    })

    .catch(function(error) {

        console.log(error);

    });
}