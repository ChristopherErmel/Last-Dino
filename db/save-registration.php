<?php
   $page_title = 'Saving your Registration...';
   
   
   // store the inputs into variables
   $username = $_POST['username'];
   $password = $_POST['password'];
   $confirm = $_POST['confirm'];
   $ok = true;
   
   // validation
   if (empty($username)) {
       echo 'Username is required<br />';
       $ok = false;
   }
   
   if (empty($password)) {
       echo 'Password is required<br />';
       $ok = false;
   }
   
   if ($password != $confirm) {
       echo 'Passwords must match<br />';
       $ok = false;
   }
   
   if ($ok) {
       // connect
       require_once ('db/db.php');
   
       // set up the sql insert
       $sql = "INSERT INTO users_account (username, password) VALUES (:username, :password)";
   
       //hashing the password in the best way possible.
       $hashed_password = password_hash($password, PASSWORD_DEFAULT);
   
       // fill the params and execute
       $cmd = $conn->prepare($sql);
       $cmd->bindParam(':username', $username);
       $cmd->bindParam(':password', $hashed_password);
       $cmd->execute();
   
       // disconnect
       $conn = null;
   }
   
   ?>
<!DOCTYPE html>
<html lang="en">
   <head>
      <meta charset="utf-8">
      <title>Christopher Ermel</title>
      <!--Style Sheet Links-->
      <link rel="stylesheet" href="css/normalize.css">
      <link rel="stylesheet" href="css/main.css">
      <!-- Below is used to set the 1x1 ratio and remove default phone functionality -->
      <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="HandheldFriendly" content="true">
   </head>
   <body>
      <div id = 'main'>
         <div class = 'mainContent'>
            <!--The main Content of the page is here (left side)-->
            <div class = 'mainContentAbout'>
               <h3>Registration:</h3>
               <p>Thank you <?php echo $username;?> for registering.</p>
               <p>You are now able to login, view your records, and make changes as you wish!</p>
            </div>
            <div class = 'mainHeading'>
               <h2>Registration Success:</h2>
               <div class = 'mainHeadingInfoAbout'>
                  <p>Your registration was successful!</p>
                  <p>Click here to <a href="myid.php">Log In</a>
                  <p>
               </div>
            </div>
         </div>
         <div class = 'mainSidebar'>
            <!--The main Side Bar Content of the page is here (right side)-->
            <div class = 'mainLinkBox'>
               <a href="./index.php">-----Home-----</a>
               <a href="./myid.php">-----My ID-----</a>               
               <a href="./register.php">-----Register-----</a>
               <a href="./about.php">-----About-----</a>
            </div>
         </div>
      </div>
   </body>
</html>