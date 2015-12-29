var Player1 : GameObject;
var Player2 : GameObject;
var CamPos : Vector3;

var coop  = false;

function Update () {
	
	CheckPlayer();

	if(coop)
	{
		GetComponent.<Camera>().orthographicSize = Mathf.Clamp((Player1.transform.position.x - Player2.transform.position.x) / 2, 3.5 ,8);
		transform.position = ((Player1.transform.position - Player2.transform.position) * 0.5) + Player2.transform.position;
		transform.position.z = -1;
		//transform.position.y = -1.5;
	}
	else
	{
		if(GameObject.Find("Player1"))
		{
			GetComponent.<Camera>().orthographicSize = 4;
			transform.position = Player1.transform.position;
			transform.position.z = -1;
			//this.transform.position.y = -2;
		}
		else if(GameObject.Find("Player2"))
		{
			GetComponent.<Camera>().orthographicSize = 4;
			transform.position = Player2.transform.position;
			transform.position.z = -1;
			//transform.position.y = -2;
		}
	}
}

function	CheckPlayer()
{
	if(GameObject.Find("Player1") && GameObject.Find("Player2"))
		coop = true;
	else
		coop = false;
}