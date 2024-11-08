<?php

$conn = new mysqli('localhost', 'root', '', 'php_crud');
if ($conn->connect_error) die("Connection failed: " . $conn->connect_error);

$action = $_POST['action'];

if ($action == 'fetch') {
    $result = $conn->query("SELECT * FROM customers");
    $customers = [];
    while ($row = $result->fetch_assoc()) {
        $customers[] = $row;
    }
    echo json_encode($customers);
} elseif ($action == 'add') {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $address = $_POST['address'];
    $conn->query("INSERT INTO customers (name, email, mobile, address) VALUES ('$name', '$email', '$mobile', '$address')");
    echo "Customer added successfully!";
} elseif ($action == 'delete') {
    $id = $_POST['id'];
    $conn->query("DELETE FROM customers WHERE id=$id");
    echo "Customer deleted successfully!";
} elseif ($action == 'edit') {
    $id = $_POST['id'];
    $name = $_POST['name'];
    $email = $_POST['email'];
    $mobile = $_POST['mobile'];
    $address = $_POST['address'];

    // Debugging: Display the received data
    error_log("Edit request - ID: $id, Name: $name, Email: $email, Mobile: $mobile, Address: $address");

    // Run update query
    $query = "UPDATE customers SET name='$name', email='$email', mobile='$mobile', address='$address' WHERE id=$id";
    if ($conn->query($query) === TRUE) {
        echo "Customer updated successfully!";
    } else {
        echo "Error updating customer: " . $conn->error;
    }
}
$conn->close();
?>
