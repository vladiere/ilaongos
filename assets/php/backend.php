<?php

require './database.php';


class backend
{
    public function register($firstname, $midname, $lastname, $email_add, $password, $role)
    {
        return self::registerAccount($firstname, $midname, $lastname, $email_add, $password, $role);
    }

    public function login($email, $password)
    {
        return self::loginAccount($email, $password);
    }

    public function getUsersList()
    {
        return self::usersList();
    }

    public function displaySingleUser()
    {
        return self::singleUser();
    }

    public function displayCarwashShop()
    {
        return self::displayShop();
    }

    public function pendingsList()
    {
        return self::pendings();
    }

    public function changeData($data)
    {
        return self::changeUserData($data);
    }

    public function viewPendingDetails($ownerID)
    {
        return self::viewPendingDetail($ownerID);
    }

    public function acceptPendings($status, $owner_id, $shop_name, $location)
    {
        return self::acceptPending($status, $owner_id, $shop_name, $location);
    }

    public function updateUserStatus($userID, $userStatus)
    {
        return self::updateStatus($userID, $userStatus);
    }

    public function updateContactAndAddress($contactNum, $address)
    {
        return self::updateUser($contactNum, $address);
    }

    public function branchShop()
    {
        return self::branchShopOwner();
    }

    public function displayShopandOwner()
    {
        return self::displayShopOwner();
    }

    // Upload documents
    public function uploadDocuments($files)
    {
        return self::uploadOwnerDocuments($files);
    }

    public function getDocuments()
    {
        return self::getOwnerDocuments();
    }

    public function displayDocuments($ownerID)
    {
        return self::displayOwnerDocuments($ownerID);
    }

    public function getRoleStatus()
    {
        return self::getRole($_SESSION["email"], $_SESSION["password"]);
    }

    // Update the shop logo image
    public function updateImageLogo($imgPath)
    {
        return self::updateShopImageLogo($imgPath);
    }

    // Upload Image to shop
    public function uploadImgProfile($profileImg)
    {
        return self::uploadShopImgProfile($profileImg);
    }

    public function addToPending($shopName, $locations)
    {
        return self::insertPending($shopName, $locations);
    }

    public function getProfile()
    {
        return self::profile();
    }

    public function setTransaction($ownerID, $shop_name, $vehicle_type, $wash_type, $price, $schedDate)
    {
        return self::setCustomerTransaction($ownerID, $shop_name, $vehicle_type, $wash_type, $price, $schedDate);
    }

    public function getTransactionsForCustomer()
    {
        return self::getTransactionsDetailsForCustomer();
    }

    public function getTransactions()
    {
        return self::getTransactionsDetails();
    }

    public function getCustomerQueue()
    {
        return self::getCustomerQueueDetails();
    }

    public function updateTransaction($trans_id, $newStatus)
    {
        return self::updateTransactionDetails($trans_id, $newStatus);
    }

    public function cancelTransactionsCustomer($trans_id)
    {
        return self::cancelTransactionsForCustomer($trans_id);
    }

    public function transactionsForAdmin()
    {
        return self::getTransactionsForAdmin();
    }

    public function recoverAccountPassword($newPassword, $recoveryEmail)
    {
        return self::getAccountPassword($newPassword, $recoveryEmail);
    }

    public function addEmployee($shop_assign, $firstname, $middlename, $lastname, $birth_date, $email_add, $contact_no, $position)
    {
        return self::registerEmployee($shop_assign, $firstname, $middlename, $lastname, $birth_date, $email_add, $contact_no, $position);
    }

    public function employeesList()
    {
        return self::getEmployees();
    }

    public function removeEmployee($status, $staff_id)
    {
        return self::removeOneEmployee($status, $staff_id);
    }

    public function addBranch($branch_name, $location)
    {
        return self::addNewBranch($branch_name, $location);
    }

    public function getBranches()
    {
        return self::getMyBranch();
    }

    public function removeBranch($branchID, $branchStatus)
    {
        return self::removeThisBranch($branchID, $branchStatus);
    }

    public function branchForCustomer()
    {
        return self::getBranchForCustomer();
    }

    public function allCarwashShopAndOwner()
    {
        return self::getAllCarwashShopAndOwner();
    }

    public function rateCarwashOwner($rate_number, $owner_ID)
    {
        return self::rateCarwashShopOwner($rate_number, $owner_ID);
    }

    public function addStars($transID, $stars_number)
    {
        return self::addStarsToOwner($transID, $stars_number);
    }

    private function addStarsToOwner($transID, $stars_number)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::addStarsToOwnerQuery());
                    $stmt->execute(array(self::getDateToday(), $stars_number, $transID));
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
            return $e;
        }
    }

    private function rateCarwashShopOwner($rate_number, $owner_ID)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::carwashShopRatingQuery());
                    $stmt->execute(array($rate_number, $owner_ID));
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
            return $e;
        }
    }

    private function getAllCarwashShopAndOwner()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getAllCarwashShopAndOwnerQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getBranchForCustomer()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getBranchForCustomerQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function removeThisBranch($branchID, $branchStatus)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::removeBranchQuery());
                    $stmt->execute(array($branchStatus, $branchID));
                    $result = $stmt->fetch();
                    $db->closeConnection();
                    return '200';
                } else {
                    return '404';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getMyBranch()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getMyBranchQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function addNewBranch($branch_name, $location)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::addNewBranchQuery());
                    $stmt->execute(array(self::getUserID(), $branch_name, $location, self::getDateToday()));
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
            return $e;
        }
    }

    private function removeOneEmployee($status, $staff_id)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::removeEmployeeQuery());
                    $stmt->execute(array($status, $staff_id));
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
            return $e;
        }
    }

    private function getEmployees()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getEmployeesQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function registerEmployee($shop_assign, $firstname, $middlename, $lastname, $birth_date, $email_add, $contact_no, $position)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::registerEmployeeQuery());
                    $stmt->execute(array(self::getUserID(), $shop_assign, $firstname, $middlename, $lastname, $birth_date, $email_add, $contact_no, $position));
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
            return $e;
        }
    }

    private function getAccountPassword($newPassword, $recoveryEmail)
    {
        try {
            if ($newPassword !== '' && $recoveryEmail !== '') {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::recoverPasswordQuery());
                    $stmt->execute(array(md5($newPassword), $recoveryEmail));
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
            return $e;
        }
    }

    private function getTransactionsForAdmin()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getTransactionsForAdminQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function cancelTransactionsForCustomer($trans_id)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::cancelTransactionsForCustomerQuery());
                    $stmt->execute(array($trans_id));
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
            return $e;
        }
    }

    private function updateTransactionDetails($trans_id, $newStatus)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::updateTransactionQuery());
                    $stmt->execute(array(self::getDateToday(), $newStatus, $trans_id));
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
            return $e;
        }
    }

    private function getCustomerQueueDetails()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getCustomerQueueQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getTransactionsDetailsForCustomer()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getTransactionQueueForCustomerQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getTransactionsDetails()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getTransactionQueueQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function setCustomerTransaction($ownerID, $shop_name, $vehicle_type, $wash_type, $price, $schedDate)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::setTransactionQuery());
                    $stmt->execute(array(self::getUserID(), $ownerID, $shop_name, $vehicle_type, $wash_type, $price, self::getDateToday(), $schedDate, self::getDateToday()));
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
            return $e;
        }
    }

    private function profile()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getProfileQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function insertPending($shopName, $locations)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::addToPendingQuery());
                    $stmt->execute(array(self::getUserID(), $shopName, $locations, self::getDateToday(), self::getDateToday()));
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
            return $e;
        }
    }

    private function updateShopImageLogo($imgPath)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::updateShopLogoQuery());
                    $stmt->execute(array($imgPath, self::getDateToday(), self::getUserID()));
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
            return $e;
        }
    }

    private function uploadShopImgProfile($profileImg)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::uploadImgProfileQuery());
                    $stmt->execute(array(self::getUserID(), $profileImg, self::getDateToday(), self::getDateToday()));
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
            return $e;
        }
    }


    private function displayOwnerDocuments($ownerID)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getDocumentsQuery());
                    $stmt->execute(array($ownerID));
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getOwnerDocuments()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::getDocumentsQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);

                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function uploadOwnerDocuments($files)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::insertDocumentsQuery());
                    $stmt->execute(array(self::getUserID(), $files, self::getDateToday(), self::getDateToday()));
                    $result = $stmt->fetch();

                    if (!$result) {
                        $db->closeConnection();
                        return self::updateStatus(self::getUserID(), 0);
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
            return $e;
        }
    }

    private function branchShopOwner()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::customerAndBranchShopQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function displayShopOwner()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::customerAndShopQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function singleUser()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::loginQuery());
                    $stmt->execute(array($_SESSION["email"], $_SESSION["password"]));
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function updateUser($contactNum, $address)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                if ($contactNum !== '' && $address !== '') {
                    $db = new database();
                    if ($db->getStatus()) {
                        $stmt = $db->getConnection()->prepare(self::updateUserQuery());
                        $stmt->execute(array($contactNum, $address, self::getUserID()));
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
                    return '406';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function updateStatus($userID, $userStatus)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::updateUserStatusQuery());
                    $stmt->execute(array($userStatus, self::getDateToday(), $userID));
                    $result = $stmt->fetch();

                    if (!$result) {
                        $db->closeConnection();
                        return self::updateCarwash($userStatus, $userID);
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
            return $e;
        }
    }

    private function updateCarwash($status, $id)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::updateStatusCarShopQuery());
                    $stmt->execute(array($status, self::getDateToday(), $id));
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
            return $e;
        }
    }

    private function acceptPending($status, $owner_id, $shop_name, $location)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($status === 2) {
                    return self::updatePending($status, $owner_id);
                } else {
                    if ($db->getStatus()) {
                        $stmt = $db->getConnection()->prepare(self::addShopQuery());
                        $stmt->execute(array($owner_id, $shop_name, $location, self::getDateToday(), self::getDateToday()));
                        $result = $stmt->fetch();
    
                        if (!$result) {
                            $db->closeConnection();
                            return self::updatePending($status, $owner_id);
                        } else {
                            $db->closeConnection();
                            return '404';
                        }
                    } else {
                        return '403';
                    }
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function updatePending($status, $owner_id)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::updatePendingQuery());
                    $stmt->execute(array($status, self::getDateToday(), $owner_id));
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
            return $e;
        }
    }

    private function viewPendingDetail($ownerID)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::viewPendingDetailsQuery());
                    $stmt->execute(array($ownerID));
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    $db->closeConnection();
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    private function changeUserData($data)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                if ($data !== '') {
                    $password = $_SESSION["password"];
                    $email = $_SESSION["email"];
                    $db = new database();
                    if ($db->getStatus()) {
                        if (filter_var($data, FILTER_VALIDATE_EMAIL)) {
                            $stmt = $db->getConnection()->prepare(self::updatePassOrEmailQuery());
                            $stmt->execute(array($password, $data, self::getUserID()));
                            $result = $stmt->fetch();
                            
                            if (!$result) {
                                $db->closeConnection();
                                $_SESSION["email"] = $data;
                                return '200';
                            } else {
                                $db->closeConnection();
                                return '404';
                            }
                        } else {
                            $stmt = $db->getConnection()->prepare(self::updatePassOrEmailQuery());
                            $stmt->execute(array(md5($data), $email, self::getUserID()));
                            $result = $stmt->fetch();
    
                            if (!$result) {
                                $db->closeConnection();
                                $_SESSION["password"] = md5($data);
                                return '200';
                            } else {
                                $db->closeConnection();
                                return '404';
                            }
                        }
                    } else {
                        return '403';
                    }
                } else {
                    return '406';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function pendings()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::pendingQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);

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

    private function displayShop()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::shopsQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);

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

    private function usersList()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::userslistQuery());
                    $stmt->execute(array());
                    $result = $stmt->fetchAll();

                    $db->closeConnection();
                    return json_encode($result);
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

    private function loginAccount($email, $password)
    {
        try {
            if (self::checkLogin($email, $password)) {

                return self::getRole($email, md5($password));
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e->getMessage();
        }
    }

    private function registerAccount($firstname, $midname, $lastname, $email_add, $password, $role)
    {
        try {
            if (self::checkRegister($firstname, $midname, $lastname, $email_add, $password, $role)) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::registerQuery());
                    if ($role === 'owner') {
                        $stmt->execute(array($email_add, md5($password), $firstname, $lastname, $midname, $role, self::getDateToday(), self::getDateToday(), 2));
                    } else {
                        $stmt->execute(array($email_add, md5($password), $firstname, $lastname, $midname, $role, self::getDateToday(), self::getDateToday(), 2));
                    }
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

    private function getShopID()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::shopQuery());
                    $stmt->execute(array(self::getUserID()));
                    $rowID = null;

                    while ($res = $stmt->fetch()) {
                        $rowID = $res['id'];
                    }
                    $db->closeConnection();
                    return $rowID;
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function getRole($email, $password)
    {
        try {
            if (self::checkLogin($email, $password)) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::loginQuery());
                    $stmt->execute(array($email, $password));
                    $row = null;
                    $status = null;

                    while ($result = $stmt->fetch()) {
                        $row = $result['role'];
                        $status = $result['status'];
                    }
                    if ($status === 1) {
                        return '401';
                    } else {
                        $db->closeConnection();
                        $_SESSION["email"] = $email;
                        $_SESSION["password"] = $password;
                        return $row;
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

    private function getUserID()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::loginQuery());
                    $stmt->execute(array($_SESSION["email"], $_SESSION["password"]));
                    $userId = null;
    
                    while ($row = $stmt->fetch()) {
                        $userId = $row["id"];
                    }
    
                    $db->closeConnection();
                    return $userId;
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

    private function checkLogin($email, $password)
    {
        return ($email != '' && $password != '') ? true : false;
    }

    private function getDateToday()
    {
        return date('Y-m-d H:i:s');
    }

    private function registerQuery()
    {
        return "INSERT INTO `tbl_users`(`email_add`, `password`, `firstname`, `lastname`, `midname`, `role`, `date_created`, `date_updated`, `status`) VALUES (?,?,?,?,?,?,?,?,?)";
    }

    private function loginQuery()
    {
        return "SELECT * FROM `tbl_users` WHERE `email_add` = ? AND `password` = ?";
    }

    private function userslistQuery()
    {
        return "SELECT * FROM `tbl_users`";
    }

    private function shopsQuery()
    {
        return "SELECT * FROM `tbl_carwashshop`";
    }

    private function shopQuery()
    {
        return "SELECT * FROM `tbl_carwashshop` WHERE `owner_id` = ?";
    }

    private function pendingQuery()
    {
        return "SELECT * FROM `tbl_pending`";
    }

    private function viewPendingDetailsQuery()
    {
        return "SELECT * FROM `tbl_pending` `tp` JOIN `tbl_users` `tu` ON `tp`.`owner_id` = `tu`.`id` WHERE `tp`.`owner_id` = ?";
    }

    private function updateUserQuery()
    {
        return "UPDATE `tbl_users` SET `contact_no` = ?, `address` = ? WHERE `id` = ?";
    }

    private function updatePassOrEmailQuery()
    {
        return "UPDATE `tbl_users` SET `password` = ?, `email_add` = ? WHERE `id` = ?";
    }

    private function updatePendingQuery()
    {
        return "UPDATE `tbl_pending` SET `status` = ?, `date_updated` = ? WHERE `owner_id` = ?";
    }

    private function updateUserStatusQuery()
    {
        return "UPDATE `tbl_users` SET `status` = ?, `date_updated` = ? WHERE `id` = ?";
    }

    private function addShopQuery()
    {
        return "INSERT INTO `tbl_carwashshop` (`owner_id`, `shop_name`, `location`, `date_publish`, `date_updated`) VALUES (?,?,?,?,?)";
    }

    private function updateStatusCarShopQuery()
    {
        return "UPDATE `tbl_carwashshop` SET `status` = ?, `date_updated` = ? WHERE `owner_id` = ?";
    }
    
    
    
    // Owner
    private function addNewBranchQuery()
    {
        return "INSERT INTO `tbl_branch`(`owner_id`, `branch_name`, `branch_location`, `date_publish`) VALUES (?,?,?,?)";
    }

    private function removeBranchQuery()
    {
        return "UPDATE `tbl_branch` SET `branch_status` = ? WHERE `branch_id` = ?";
    }

    private function getEmployeesQuery()
    {
        return "SELECT * FROM `tbl_staff` WHERE `owner_id` = ?";
    }

    private function removeEmployeeQuery()
    {
        return "UPDATE `tbl_staff` SET `staff_status` = ? WHERE `staff_id` = ?";
    }

    private function registerEmployeeQuery()
    {
        return "INSERT INTO `tbl_staff`(`owner_id`, `shop_assign`, `firstname`, `middlename`, `lastname`, `date_of_birth`, `email_address`, `contact_number`, `position`) VALUES (?,?,?,?,?,?,?,?,?)";
    }

    public function updatePriceList($price, $listID)
    {
        return self::updateList($price, $listID);
    }

    public function addNewPriceList($wash_type, $car_type, $price)
    {
        return self::addPriceList($wash_type, $car_type, $price);
    }

    public function deletePriceList($listID)
    {
        return self::deleteSinglePriceList($listID);
    }

    private function addPriceList($wash_type, $car_type, $price)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::addPriceListQuery());
                    $stmt->execute(array(self::getUserID(), $price, $wash_type, $car_type, self::getDateToday(), self::getDateToday()));
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
            return $e;
        }
    }

    private function updateList($price, $listID)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::updatePriceListQuery());
                    $stmt->execute(array($price, self::getDateToday(), $listID));
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
            return $e;
        }
    }

    private function priceList()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::priceListQuery());
                    $stmt->execute(array(self::getUserID()));
                    $result = $stmt->fetchAll();
                    
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function priceListForCustomer()
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database();
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::priceListForCustomerQuery());
                    $stmt->execute();
                    $result = $stmt->fetchAll();
                    
                    $db->closeConnection();
                    return json_encode($result);
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }

    private function deleteSinglePriceList($listID)
    {
        try {
            if (self::checkLogin($_SESSION["email"], $_SESSION["password"])) {
                $db = new database;
                if ($db->getStatus()) {
                    $stmt = $db->getConnection()->prepare(self::deletePriceListQuery());
                    $stmt->execute(array($listID));
                    $result = $stmt->fetch();
                    if (!$result) {
                        $db->closeConnection();
                        return '200';
                    } else {
                        $db->closeConnection();
                        return '200';
                    }
                } else {
                    return '403';
                }
            } else {
                return '403';
            }
        } catch (PDOException $e) {
            return $e;
        }
    }
    
    public function displayPriceList()
    {
        return self::priceList();
    }
    
    public function displayPriceListForCustomer()
    {
        return self::priceListForCustomer();
    }

    private function getDocumentsQuery()
    {
        return "SELECT * FROM `tbl_documents` WHERE `owner_id` = ?";
    }

    private function insertDocumentsQuery()
    {
        return "INSERT INTO `tbl_documents`(`owner_id`, `img_path`, `date_publish`, `date_updated`) VALUES (?,?,?,?)";
    }

    private function customerAndShopQuery()
    {
        return "SELECT * FROM `tbl_users` `tu` JOIN `tbl_carwashshop` `tc` ON `tc`.`owner_id` = `tu`.`id`";
    }

    private function customerAndBranchShopQuery()
    {
        return "SELECT * FROM `tbl_branch` `tb` JOIN `tbl_users` `tu` ON `tu`.`id` = `tb`.`owner_id`";
    }

    private function priceListQuery()
    {
        return "SELECT * FROM `tbl_pricelist` WHERE `user_id` = ?";
    }

    private function priceListForCustomerQuery()
    {
        return "SELECT * FROM `tbl_pricelist`";
    }

    private function addPriceListQuery()
    {
        return "INSERT INTO `tbl_pricelist` (`user_id`, `price`, `wash_type`, `vehicle_type`, `date_created`, `date_updated`) VALUES (?,?,?,?,?,?)";
    }

    private function updatePriceListQuery()
    {
        return "UPDATE `tbl_pricelist` SET `price` = ?, `date_updated` = ? WHERE `id` = ?";
    }

    private function deletePriceListQuery()
    {
        return "DELETE FROM `tbl_pricelist` WHERE `id` = ?";
    }

    private function updateShopLogoQuery()
    {
        return "UPDATE `tbl_profile` SET `profile_path` = ?, `date_updated` = ? WHERE `user_id` = ?";
    }

    private function uploadImgProfileQuery()
    {
        return "INSERT INTO `tbl_profile`(`user_id`, `profile_path`, `date_added`, `date_updated`) VALUES (?,?,?,?)";
    }

    private function addToPendingQuery()
    {
        return "INSERT INTO `tbl_pending`(`owner_id`, `shop_name`, `location`, `date_added`, `date_updated`) VALUES (?,?,?,?,?)";
    }

    private function getProfileQuery()
    {
        return "SELECT * FROM `tbl_profile` JOIN `tbl_pending`";
    }

    private function getBranchForCustomerQuery()
    {
        return "SELECT * FROM `tbl_branch`";
    }

    private function getMyBranchQuery()
    {
        return "SELECT * FROM `tbl_branch` WHERE `owner_id` = ?";
    }

    // Customer
    private function setScheduleQuery()
    {
        return "INSERT INTO `tbl_schedule` (`shop_id`, `customer_id`, `date_added`, `sched_date`) VALUES (?,?,?,?)";
    }

    private function setTransactionQuery()
    {
        return "INSERT INTO `tbl_transactions` (`user_id`, `shopowner_id`, `carwash_name`, `vehicle_type`, `wash_type`, `price`, `date_added`, `date_sched`, `date_updated`) VALUES (?,?,?,?,?,?,?,?,?)";
    }

    private function updateTransactionQuery()
    {
        return "UPDATE `tbl_transactions` SET `date_updated` = ?, `trans_status` = ? WHERE `trans_id` = ?";
    }

    private function getCustomerQueueQuery()
    {
        return "SELECT * FROM `tbl_transactions` `tt` JOIN `tbl_users` `tu` ON `tt`.`user_id` = `tu`.`id` WHERE `tt`.`shopowner_id` = ? ORDER BY `date_sched` ASC";
    }

    private function getTransactionQueueQuery()
    {
        return "SELECT * FROM `tbl_transactions` `tt` JOIN `tbl_users` `tu` ON `tt`.`user_id` = `tu`.`id` WHERE `shopowner_id` = ?";
    }

    private function getTransactionQueueForCustomerQuery()
    {
        return "SELECT * FROM `tbl_transactions` WHERE `user_id` = ?";
    }

    private function cancelTransactionsForCustomerQuery()
    {
        return "DELETE FROM `tbl_transactions` WHERE `trans_id` = ?";
    }

    private function getTransactionsForAdminQuery()
    {
        return "SELECT * FROM `tbl_transactions`";
    }

    private function recoverPasswordQuery()
    {
        return "UPDATE `tbl_users` SET `password` = ? WHERE `email_add` = ?";
    }

    private function getAllCarwashShopAndOwnerQuery()
    {
        return "SELECT * FROM `tbl_carwashshop` JOIN `tbl_profile` ON `tbl_profile`.`user_id` = `tbl_carwashshop`.`owner_id` JOIN `tbl_users` ON `tbl_users`.`id` = `tbl_carwashshop`.`owner_id`";
    }

    private function updateLogoImageQuery()
    {
        return "UPDATE `tbl_profile` SET `profile_path` = ?, `date_updated` = ? WHERE `user_id` ?";
    }

    private function carwashShopRatingQuery()
    {
        return "UPDATE `tbl_carwashshop` SET `rating` = ((`rating` * `number_rate`) + ?) / (`number_rate` + 1), `number_rate` = `number_rate` + 1 WHERE `owner_id` = ?";
    }

    private function addStarsToOwnerQuery()
    {
        return "UPDATE `tbl_transactions` SET `date_updated` = ?, `stars` = ? WHERE `trans_id` = ?";
    }

}


?>