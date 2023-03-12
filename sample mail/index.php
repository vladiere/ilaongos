<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../assets/css/bootstrap.min.css">
    <link rel="stylesheet" href="../assets/css/all.min.css">
    <link rel="stylesheet" href="../assets/css/styles.css">
    <link rel="icon" href="../assets/img/cwb-logo.png">
    <link rel="stylesheet" href="../assets/css/toastr.min.css">
    
    <title>Carwash Boy - Recover Password</title>
</head>
<body class="auth-body">
    <section class="authentication">
        <div class="container d-flex justify-content-center align-items-center">
            <div class="authentication-wrapper">
                <p><a href="../index.html" class="link-primary text-decoration-none">Back to Home Page</a> </p>
                <div class="form-auth">
                    <img class="auth-wave-svg" src="../assets/img/wave.svg" alt="...">
                    <div class="form-inputs d-flex flex-column" id="recoveryOptions">
                        <div class="form-brand d-flex justify-content-center">
                            <img class="form-logo" src="../assets/img/cwb-logo.png">
                        </div>
                        <h2 class="text-center mb-2">Recover your account</h2>
                        <p class="form-description text-center mb-4">Come in dirty, come out clean.</p>
                        <h6 class="d-none" id="otptimer">OTP Code Will expire at <span id="timer">120</span></h6>
                        <div class="form-floating mb-3" id="recoverEmail">
                            <input type="email" class="form-control" id="email" name="email" placeholder="name@example.com">
                            <label for="emailadd">Recovery Email</label>
                        </div>
                        <div class="form-floating mb-3 d-none" id="recoverOtp">
                            <input type="text" class="form-control" id="confirmOtp" name="confirmOtp" placeholder="8 Digits OTP Code">
                            <label for="confirmOtp">Confirm OTP Code</label>
                        </div>
                        <div class="col-12 mt-4" id="sendOtp">
                            <button class="btn-primary w-100" id="send">Send</button>
                        </div>
                        <div class="col-12 mt-4 d-none" id="accRecover">
                            <button class="btn-primary w-100" id="verify">Verify</button>
                        </div>
                    </div>

                    <div class="form-inputs d-flex flex-column d-none" id="changeMyPass">
                        <div class="form-brand d-flex justify-content-center">
                            <img class="form-logo" src="../assets/img/cwb-logo.png">
                        </div>
                        <h2 class="text-center mb-2">Set your New Password</h2>
                        <p class="form-description text-center mb-4">Come in dirty, come out clean.</p>
                        
                        <div class="form-floating mb-3">
                            <input type="password" class="form-control" id="newPassword" placeholder="New Password">
                            <label for="newPassword">New Password</label>
                            <p class="text-danger m-0 p-0" id="errorPass"></p>
                        </div>
                        
                        <div class="form-floating mb-1">
                            <input type="password" class="form-control" id="confirmNewPassword" placeholder="Confirm New Password">
                            <label for="confirmNewPassword">Confirm New Password</label>
                            <p class="text-danger m-0 p-0" id="errorConfirm"></p>
                        </div>
                        <div class="col-12 mt-4">
                            <button class="btn-primary w-100" id="recover">Recover</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/sweetalert.js"></script>
    <script src="../assets/js/recoverpass.js"></script>

</body>
</html>