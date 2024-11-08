$(document).ready(function () {
    fetchCustomers(); // Call fetchCustomers to load customers on page load

    // Add Customer
    $('#addForm').submit(function (e) {
        e.preventDefault(); // Prevent default form submission

        const name = $('#name').val();
        const email = $('#email').val();
        const mobile = $('#mobile').val();
        const address = $('#address').val();

        $.post('customer_crud.php', {
            action: 'add',
            name: name,
            email: email,
            mobile: mobile,
            address: address
        }, function (response) {
            alert(response);
            fetchCustomers(); // Refresh customers after adding
            $('#addForm')[0].reset(); // Clear the form
        });
    });
});

// Fetch Customers function
function fetchCustomers() {
    $.post('customer_crud.php', { action: 'fetch' }, function (data) {
        const customers = JSON.parse(data);
        let rows = '';
        customers.forEach(customer => {
            rows += `
                <tr>
                    <td>${customer.id}</td>
                    <td>${customer.name}</td>
                    <td>${customer.email}</td>
                    <td>${customer.mobile}</td>
                    <td>${customer.address}</td>
                    <td>
                        <button onclick="deleteCustomer(${customer.id})">Delete</button>
                        <button onclick="editCustomer(${customer.id}, '${customer.name}', '${customer.email}', '${customer.mobile}', '${customer.address}')">Edit</button>
                    </td>
                </tr>
            `;
        });
        $('#customerTable tbody').html(rows); // Update the table body
    });
}

// Delete Customer function
function deleteCustomer(id) {
    if (confirm("Are you sure you want to delete this customer?")) {
        $.post('customer_crud.php', { action: 'delete', id: id }, function (response) {
            alert(response);
            fetchCustomers(); // Refresh customers after deletion
        });
    }
}

// Edit Customer function
function editCustomer(id, name, email, mobile, address) {
    $('#name').val(name);
    $('#email').val(email);
    $('#mobile').val(mobile);
    $('#address').val(address);
    $('#submitButton').text('Update Customer'); // Change button text to indicate update mode

    // Change the form submission to handle the update
    $('#addForm').off('submit').submit(function (e) {
        e.preventDefault(); // Prevent default form submission

        const updatedName = $('#name').val();
        const updatedEmail = $('#email').val();
        const updatedMobile = $('#mobile').val();
        const updatedAddress = $('#address').val();

        $.post('customer_crud.php', {
            action: 'edit',
            id: id,
            name: updatedName,
            email: updatedEmail,
            mobile: updatedMobile,
            address: updatedAddress
        }, function (response) {
            alert(response);
            fetchCustomers(); // Refresh customers after editing
            $('#addForm')[0].reset(); // Clear the form
            $('#submitButton').text('Add Customer'); // Reset button text back to 'Add Customer'
            
            // Rebind the add customer function
            $('#addForm').off('submit').submit(function (e) {
                e.preventDefault(); // Prevent default form submission
                const name = $('#name').val();
                const email = $('#email').val();
                const mobile = $('#mobile').val();
                const address = $('#address').val();

                $.post('customer_crud.php', {
                    action: 'add',
                    name: name,
                    email: email,
                    mobile: mobile,
                    address: address
                }, function (response) {
                    alert(response);
                    fetchCustomers(); // Refresh customers after adding
                    $('#addForm')[0].reset(); // Clear the form
                });
            });
        });
    });
}
