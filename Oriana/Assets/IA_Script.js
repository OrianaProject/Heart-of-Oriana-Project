var p1 : GameObject;
var p2 : GameObject;

function Start()
{
	if(GameObject.Find("Player1"))
		p1 = GameObject.Find("Player1");
	if(GameObject.Find("Player2"))
		p2 = GameObject.Find("Player2");
}

function Update()
{
	moveTo();
}

function checkDist()
{
 	var dist1 = Vector2.Distance(transform.position, p1.transform.position);
 	var dist2 = Vector2.Distance(transform.position, p2.transform.position);
 	return ((dist1 < dist2) ? p1 : p2);
}

function moveTo()
{
	
}