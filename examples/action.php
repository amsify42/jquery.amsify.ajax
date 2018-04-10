<?php

$cities 	= [
	1 => [
		1 => 'Hyderabad',
		2 => 'Delhi',
		3 => 'Punjab',
	],
	2 => [
		4 => 'Kabul',
		5 => 'Kandahar',
		6 => 'Herat',
	],
	3 => [
		7 => 'Chicago',
		8 => 'Peoria',
		9 => 'Rockford',
	],
];

$selections = (isset($_POST['value']))? $cities[$_POST['value']]: [];
$options 	= '';
foreach($selections as $id => $name) {
	$options 	.= '<option value="'.$id.'">'.$name.'</option>';
}

header('Content-type: application/json');
echo json_encode(array(
						'status' 	=> true,
						'message' 	=> 'Toggle Successfull',
						'html' 		=> $options
					));