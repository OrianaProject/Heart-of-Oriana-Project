var Player1 : GameObject;
var Player2 : GameObject;
var CamPos : Vector3;

var coop  = false;

function Update () {
	
	CheckPlayer();

	if(coop)
	{
		this.GetComponent.<Camera>().orthographicSize = Mathf.Clamp(Vector3.Distance(Player1.transform.position, Player2.transform.position) / 2, 3.5 ,8);
		this.transform.position = ((Player1.transform.position - Player2.transform.position) * 0.5) + Player2.transform.position;
		this.transform.position.z = -1;
		this.transform.position.y = -2;
	}
	else
	{
		if(GameObject.Find("Player1"))
		{
			this.GetComponent.<Camera>().orthographicSize = 4;
			this.transform.position = Player1.transform.position;
			this.transform.position.z = -1;
			this.transform.position.y = -2;
		}
		else if(GameObject.Find("Player2"))
		{
			this.GetComponent.<Camera>().orthographicSize = 4;
			this.transform.position = Player2.transform.position;
			this.transform.position.z = -1;
			this.transform.position.y = -2;
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