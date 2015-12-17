var Key : Transform [];
var Plateform : Transform;

var Current_Key = 1;
var step = 0.00;
var goForward = true;

function Update () {

	movePlateform();
	oneDirection();

}

function movePlateform()
{
	if (Vector2.Distance(Plateform.transform.position, Key[Current_Key].transform.position) > 0.1)
	{
		step += 0.001;
		Plateform.transform.position = Vector2.Lerp(Plateform.transform.position, Key[Current_Key].transform.position, step);
	}
	if (Vector2.Distance(Plateform.transform.position, Key[Current_Key].transform.position) < 0.1)
	{
		step = 0.00;
		if (goForward)
			Current_Key++;
		if (!goForward)
			Current_Key--;					
	}
}

function oneDirection()
{
	if (goForward && (Current_Key + 1) >= Key.Length)
			goForward = false;
	else if (!goForward && (Current_Key - 1) < 0)
			goForward = true;
}

function OnTriggerEnter2D(Col : Collision2D)
{
	if(Col.gameObject.tag == "Player")
		Col.transform.parent = this.transform;
}