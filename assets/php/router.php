<?php
session_start();
require './backend.php';

if ($_POST["choice"]) {
    $back = new backend();
    
    switch ($_POST["choice"]) {
        case 'register':
            echo $back->register($_POST["firstname"], $_POST["midname"], $_POST["lastname"], $_POST["email"], $_POST["password"], $_POST["role"]);      
            break;
        case 'login':
            echo $back->login($_POST["email"], $_POST["password"]);
            break;
        case 'displaySingleUser':
            echo $back->displaySingleUser();
            break;

        // Admin
        case 'displayUsers':
            echo $back->getUsersList();
            break;
        case 'displayCarwashShop':
            echo $back->displayCarwashShop();
            break;
        case 'displayShop':
            echo $back->displayShopandOwner();
            break;
        case 'branchShop':
            echo $back->branchShop();
            break;
        case 'pendings':
            echo $back->pendingsList();
            break;
        case 'changeData':
            echo $back->changeData($_POST["oldData"]);
            break;
        case 'pendingdetails':
            echo $back->viewPendingDetails($_POST["ownerid"]);
            break;
        case 'addshop':
            echo $back->acceptPendings($_POST["status"],$_POST["ownerid"], $_POST["shopname"], $_POST["location"]);
            break;
        case 'banUser':
            echo $back->updateUserStatus($_POST["userID"], $_POST["status"]);
            break;
        case 'getRole':
            echo $back->getRoleStatus();
            break;
        case 'transactionsForAdmin':
            echo $back->transactionsForAdmin();
            break;
        case 'updateContactAndAddress':
            echo $back->updateContactAndAddress($_POST["contactNumber"], $_POST["address"]);
            break;
        case 'recoverAccountPassword':
            echo $back->recoverAccountPassword($_POST["newPassword"], $_POST["recoveryEmail"]);
            break;
        
        // Owner
        case 'addEmployee':
            echo $back->addEmployee($_POST["assign"], $_POST["firstname"], $_POST["midname"], $_POST["lastname"], $_POST["birth_date"], $_POST["email_add"], $_POST["contact_no"], $_POST["position"]);
            break;
        case 'addBranch':
            echo $back->addBranch($_POST["location"]);
            break;
        case 'removeEmployee':
            echo $back->removeEmployee($_POST["status"], $_POST["staffID"]);
            break;
        case 'getBranches':
            echo $back->getBranches();
            break;
        case 'branchForCustomer':
            echo $back->branchForCustomer();
            break;
        case 'allCarwashShopAndOwner':
            echo $back->allCarwashShopAndOwner();
            break;
        case 'removeBranch':
            echo $back->removeBranch($_POST["branchID"], $_POST["branchStatus"]);
            break;
        case 'employeesList':
            echo $back->employeesList();
            break;
        case 'pricelist':
            echo $back->displayPriceList();
            break;
        case 'pricelistForCustomer':
            echo $back->displayPriceListForCustomer();
            break;
        case 'addNewPriceList':
            echo $back->addNewPriceList($_POST["wash_type"], $_POST["car_type"], $_POST["price"]);
            break;
        case 'updatePriceList':
            echo $back->updatePriceList($_POST["price"], $_POST["listID"]);
            break;
        case 'deletePriceList':
            echo $back->deletePriceList($_POST["listID"]);
            break;
        case 'getdocuments':
            echo $back->getDocuments();
            break;
        case 'displayDocuments':
            echo $back->displayDocuments($_POST["idOwner"]);
            break;
        case 'addToPending':
            echo $back->addToPending($_POST["shopName"], $_POST["locations"]);
            break;
        case 'getProfile':
            echo $back->getProfile();
            break;
        case 'setTransaction':
            echo $back->setTransaction($_POST["ownerID"], $_POST["shop_name"], $_POST["vehicle_type"], $_POST["wash_type"], $_POST["price"], $_POST["schedDate"]);
            break;
        case 'getTransactions':
            echo $back->getTransactions();
            break;
        case 'addComments':
            echo $back->addComments($_POST["transID"], $_POST["comments"]);
            break;
        case 'getTransactionsForCustomer':
            echo $back->getTransactionsForCustomer();
            break;
        case 'cancelTransactionsCustomer':
            echo $back->cancelTransactionsCustomer($_POST["trans_id"]);
            break;
        case 'getCustomerQueue':
            echo $back->getCustomerQueue();
            break;
        case 'addStars':
            echo $back->addStars($_POST["transID"], $_POST["stars"]);
            break;
        case 'rateCarwashOwner':
            echo $back->rateCarwashOwner($_POST["rate_number"], $_POST["owner_id"]);
            break;
        case 'updateTransaction':
            echo $back->updateTransaction($_POST["trans_id"], $_POST["newStatus"], $_POST["staff_id"]);
            break;
        case 'logout':
            session_destroy();
            session_unset();
            echo '200';
            break;
        default:
            # code...
            break;
    }
}



?>