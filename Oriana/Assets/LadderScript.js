function OnCollisionEnter( obj : Collision)
{
	if(obj.name == "Player1" || obj.name == "Player2")
	{
		Debug.Log(obj.name + "est entre de la zone");
		obj.gameObject.GetComponent.<Rigidbody2D>().gravityScale = 0;
	}
}

function OnCollisionExit( obj : Collision)
{
	if(obj.name == "Player1" || obj.name == "Player2")
	{
		Debug.Log(obj.name + "est sorti de la zone");
		obj.gameObject.GetComponent.<Rigidbody2D>().gravityScale = 1;
	}
}