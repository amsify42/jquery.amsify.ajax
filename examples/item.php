<?php
sleep(1);
header('Content-type: application/json');
echo json_encode(array(
						'status' 	=> true,
						'message' 	=> 'Action Successfull',
						'id' 		=> date('ymdhis')
					));