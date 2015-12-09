function OnTriggerEnter2D( obj : Collider2D)
{
	if(obj.name == "Player1" || obj.name == "Player2")
	{
		Debug.Log(obj.gameObject.name + "est entre de la zone");
		obj.gameObject.GetComponent.<Rigidbody2D>().gravityScale = 0;
	}
}

function OnTriggerExit2D( obj : Collider2D)
{
	if(obj.name == "Player1" || obj.name == "Player2")
	{
		Debug.Log(obj.gameObject.name + "est sorti de la zone");
		obj.gameObject.GetComponent.<Rigidbody2D>().gravityScale = 1;
	}
}