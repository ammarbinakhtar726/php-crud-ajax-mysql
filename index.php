<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Customer Management</title>
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
    <script src="https://code.jquery.com/jquery-3.5.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
</head>
<body>
<div class="container">
    <h2>Manage Customers</h2>

    <!-- Add Customer Form -->
    <form id="addForm">
        <input type="text" id="name" placeholder="Full Name" required>
        <input type="email" id="email" placeholder="Email" required>
        <input type="text" id="mobile" placeholder="Mobile" required>
        <input type="text" id="address" placeholder="Address" required>
        <button type="submit" id="submitButton">Add Customer</button> <!-- Add ID here -->
    </form>

    <!-- Customer Table -->
    <table id="customerTable" class="display">
        <thead>
            <tr>
                <th>ID</th><th>Name</th><th>Email</th><th>Mobile</th><th>Address</th><th>Actions</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
</div>

<script src="script.js"></script>
<script>
    $(document).ready(function () {
        $('#customerTable').DataTable(); // Initialize DataTables
    });
</script>
</body>
</html>
