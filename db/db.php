<?php 

//127.0.0.1:52546 azure 6#vWHD_$
//localhost:3306 root 
	//used for active web
	// $conn = new PDO('mysql:host=127.0.0.1:52546;dbname=usersinfo', 'azure', '6#vWHD_$'); //used for pdo
	// $con = new mysqli("127.0.0.1:52546", "azure", "6#vWHD_$", "usersinfo"); //used for getting last id with mysqli

	$conn = new PDO('mysql:host=localhost:3308;dbname=dinoHS', 'root', '');
	$con = new mysqli("localhost:3308", "root", "", "dinoHS"); //used for getting last id with mysqli

 ?>

