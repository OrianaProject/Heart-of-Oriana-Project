var posCam : Transform[];
var Cam : Camera;
var Speed = 5.0f;
var Moving = false;
private var i = 1;

function Update()
{
 		isMoving();
 		Vector3.MoveTowards(Cam.transform.position, posCam[i].transform.position, Speed * Time.deltaTime);
}
	

function isMoving()
{
	var posA = Cam.transform.position;
	yield;
	var posB = Cam.transform.position;
	Moving = (posA != posB) ? true : false;
}