<?php 
session_start();
require './backend.php';

if(isset($_FILES['files'])){
    $back = new backend();
    $errors= array();
    $file_name = $_FILES['files']['name'];
    $file_size = $_FILES['files']['size'];
    $file_tmp = $_FILES['files']['tmp_name'];
    $file_type= $_FILES['files']['type'];  
    if($file_size > 10097152){
        $errors[]='File size must be less than 2 MB';
    }

    $desired_dir="user_data";
    $imgPath = $desired_dir . '/' . $file_name;
    $status = '';
    if(empty($errors)==true){
        if(is_dir($desired_dir)==false){
            mkdir("$desired_dir", 0700);        // Create directory if it does not exist
        }
        if(is_dir("$desired_dir/".$file_name)==false){
            move_uploaded_file($file_tmp,"user_data/".$file_name);
        }else{                                  // rename the file if another one exist
            $new_dir="user_data/".$file_name.time();
             rename($file_tmp,$new_dir) ;               
        }
        $status = $back->updateImageLogo($imgPath);
    }else{
            print_r($errors);
    }
    if(empty($error)){
        echo $status;
    }
}



?>