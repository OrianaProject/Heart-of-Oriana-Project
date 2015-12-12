private var isInside = false;
private var isMoved = false;

var Speed = 0.05;
var MaxDist = 0;


var endPos1 : Transform;
var endPos2 : Transform;
var P1 : Transform;
var P2 : Transform;

var ovni : Transform;

function Update()
{
	if (isInside)
		movePlayer();
}

function OnTriggerEnter2D(coll : Collider2D) {
	if (coll.name == "Player1" || coll.name == "Player2")
	{
		Player1_movement.canMove = false;
		//Player1_movement.rb.isKinematic = true;
		Player2_movement.canMove = false;
		//Player2_movement.rb.isKinematic = true;
		
		isInside = true;
	}
}

function movePlayer()
{
	if ((Vector2.Distance(P1.transform.position, endPos1.transform.position) && Vector2.Distance(P2.transform.position, endPos2.transform.position)) > 0.5 && !isMoved)
	{
		P1.transform.position = Vector2.Lerp(	P1.transform.position, endPos1.transform.position, Speed);
		P2.transform.position = Vector2.Lerp(P2.transform.position, endPos2.transform.position, Speed);
		Debug.Log("Movement");
	}
	else
		{
			Debug.Log("Saut");
			isMoved = true;
			//Player1_movement.rb.velocity = new Vector2(0,5);
			//Player2_movement.rb.velocity = new Vector2(0,5);
			ovni.GetComponent.<Animation>().Play("Ovni_Come");
		}
}
