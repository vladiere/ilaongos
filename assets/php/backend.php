<?php 

use database;


class backend
{
    public function register($firstname, $midname, $lastname, $email_add, $password, $role)
    {
        return self::registerAccount($firstname, $midname, $lastname, $email_add, $password, $role);
    }

    private function registerAccount($firstname, $midname, $lastname, $email_add, $password, $role)
    {
        try {
            if (self::checkRegister($firstname, $midname, $lastname, $email_add, $password, $role)) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::registerQuery());
                    $stmt->execute(array($firstname, $midname, $lastname, $email_add, md5($password), $role, self::getDateToday()));
                    $result = $stmt->fetch();

                    if (!$result) {
                        $db->closeConnection();
                        return '200';
                    } else {
                        $db->closeConnection();
                        return '404';
                    }
                    
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    private function checkRegister($firstname, $midname, $lastname, $email_add, $password, $role)
    {
        $flag = false;

        if (filter_var($email_add, FILTER_VALIDATE_EMAIL)) {
            if ($firstname != '' && $midname != '' && $lastname != '' && $password != '' && $role != '') {
                $flag = true;
            }
        }

        return $flag;
    }

    private function getDateToday()
    {
        return date('Y-m-d');
    }

    private function registerQuery()
    {
        return "INSERT INTO `account`(`firstname`, `mid_name`, `lastname`, `email_add`, `password`, `role`, `date_created`) VALUES (?,?,?,?,?,?,?)";
    }
}


?>