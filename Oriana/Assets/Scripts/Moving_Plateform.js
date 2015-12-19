var canMove = true;
var jumpToFirst = false;
var loop = false;
var goForward = true;

var Key : Transform;
var Obj : Transform;

var Current_Key = 1;
var step = 0.00;
var Speed = 1.0;

function Awake () {
		if (Current_Key > Key.childCount || Current_Key < 0)
			Current_Key = 0;
	}

function Start()
{
	Obj.transform.position = Key.GetChild(Current_Key).transform.position;
}

function Update () {
	
	if (canMove)
	{
		oneDirection();
		moveObj();
	}
	if (jumpToFirst && loop)
	{
		EditorUtility.DisplayDialog("OK TAMER","Va Niquer ta mere, je peux pas faire les deux en meme temps fdp !", "ok c'est bon, je savais pas");
		jumpToFirst = false;
	}
	debugPath();
	//debugLol();
}


function debugPath()
{
	if (loop)
		Debug.DrawLine(Key.GetChild(Key.childCount - 1).transform.position,Key.GetChild(0).transform.position, Color.green);
	for (var i = 0; i < (Key.childCount - 1); i++)
	{
		Debug.DrawLine(Key.GetChild(i).transform.position,Key.GetChild(i + 1).transform.position, Color.red);
		//Key.GetChild(i).GetComponent.<Renderer>().enabled = false;
	}
}

function debugLol()
{
	for (var i = 0; i < (Key.childCount - 1); i++)
	{
		for (var j = 0; j < (Key.childCount); j++)
			Debug.DrawLine(Key.GetChild(i).transform.position,Key.GetChild(j).transform.position, Color.red);
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
		if (goForward && Current_Key + 1 >= Key.childCount && loop)
				Current_Key = 0;
		else if (goForward && Current_Key + 1 >= Key.childCount && jumpToFirst)
		{
			Current_Key = 0;
			Obj.transform.position = Key.GetChild(Current_Key).transform.position;
		}
		else if (goForward)
			Current_Key++;
			
		/*------------------*/
			
		if (!goForward && Current_Key - 1 < 0 && loop)
				Current_Key = Key.childCount;
		else if (!goForward && Current_Key - 1 < 0 && jumpToFirst)
		{
			Current_Key = Key.childCount;
			Obj.transform.position = Key.GetChild(Current_Key).transform.position;
		}
		if (!goForward)
			Current_Key--;					
	}
}

function oneDirection()
{
	if (goForward && (Current_Key + 1) >= Key.childCount && !loop && !jumpToFirst)
			goForward = false;
	else if (!goForward && (Current_Key) <= 0 && !loop && !jumpToFirst)
			goForward = true;
}