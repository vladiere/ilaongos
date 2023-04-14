<?php 

class database
{
    private $host;
    private $user;
    private $password;
    private $dbname;
    private $status;
    private $conn;

    public function __construct()
    {
        $this->host = 'localhost';
        $this->user = 'root';
        $this->password = 'Qwerty@$12344';
        $this->dbname = 'carwashboy';
        $this->status = false;

        $this->conn = $this->init();

    }

    public function getStatus()
    {
        return $this->status;
    }

    public function getConnection()
    {
        return $this->conn;
    }

    public function closeConnection()
    {
        $this->conn = null;
    }
    private function init()
    {
        try {
            $conn = new PDO("mysql:host=$this->host;dbname=" . $this->dbname, $this->user, $this->password);
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->status = true;

            return $conn;
        } catch (PDOException $e) {
            echo "Connection failure: " . $e->getMessage();
        }
    }

}


?>