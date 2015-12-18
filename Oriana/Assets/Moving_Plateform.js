var canMove = true;

var Key : Transform;
var Obj : Transform;

var Current_Key = 1;
var step = 0.00;
var Speed = 1.0;
var goForward = true;

function Start()
{
	Obj.transform.position = Key.GetChild(Current_Key).transform.position;
}

function Update () {

	if (canMove)
	{
		moveObj();
		oneDirection();
		debugPath();
	}
}


function debugPath()
{
	for (var i = 0; i < (Key.childCount - 1); i++)
	{
		Debug.DrawLine(Key.GetChild(i).transform.position,Key.GetChild(i + 1).transform.position, Color.red);
	}
}


function moveObj()
{
	if (Vector2.Distance(Obj.transform.position, Key.GetChild(Current_Key).transform.position) > 0.1)
	{
		step += Speed * 0.0001;
		Obj.transform.position = Vector2.Lerp(Obj.transform.position, Key.GetChild(Current_Key).transform.position, step);
	}
	if (Vector2.Distance(Obj.transform.position, Key.GetChild(Current_Key).transform.position) < 0.1)
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
	if (goForward && (Current_Key + 1) >= Key.childCount)
			goForward = false;
	else if (!goForward && (Current_Key - 1) < 0)
			goForward = true;
}
