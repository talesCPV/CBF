<?php

	include 'crip.php';

	$usuario  = decrip('rvru4r=lDXJ]36r(vFrsxtr-7r-/q)/!e mZ`r8u+r1mr9QR');
	$senha    = decrip('P*PSjPrUktbUilP^TsPQVRr*mPceF_/ZdYRhcPnSaPgdPo(h');
	$servidor = decrip('+p+.G+ONlln:FI+9/q+,1-W-J+@B9:L5L4UL`+K.=+DV+Lml');
	$banco    = decrip('mvjm,j4hDXF]+.jxnTjkp[r0/j"%qT/Zes[Z\j0\ jJmD1QR');

	$conexao = new mysqli($servidor, $usuario, $senha, $banco);

	if (!$conexao)
		die ("Erro de conexão com localhost, o seguinte erro ocorreu -> ".mysql_error());


?>
