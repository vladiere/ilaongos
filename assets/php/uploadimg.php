<?php
session_start();
require './backend.php';

if(isset($_FILES['files'])){
    $back = new backend();
    $errors= array();

    foreach($_FILES['files']['tmp_name'] as $key => $tmp_name ){
        $file_name = $key.$_FILES['files']['name'][$key];
        $file_size =$_FILES['files']['size'][$key];
        $file_tmp =$_FILES['files']['tmp_name'][$key];
        $file_type=$_FILES['files']['type'][$key];  
        if($file_size > 10097152){
            $errors[]='File size must be less than 10 MB';
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
            $status = $back->uploadDocuments($imgPath);
        }else{
                print_r($errors);
        }
    }
    if(empty($error)){
        echo $status;
    }
}
?>
