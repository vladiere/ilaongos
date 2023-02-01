<?php
session_start();
use backend;

if ($_POST["choice"]) {
    $back = new backend();

    switch ($_POST["key"]) {
        case 'register':
            echo $back->register($_POST["firstname"], $_POST["midname"], $_POST["lastname"], $_POST["email"], $_POST["password"], $_POST["role"]);      
            break;
        case 'label':
            # code...
            break;
        default:
            # code...
            break;
    }
}



?>