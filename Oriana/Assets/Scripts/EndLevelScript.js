private var isInside = false;
private var isMoved = false;
private var canChangeLvl = false;

var Speed = 0.05;
var MaxDist = 0;


var endPos1 : Transform;
var endPos2 : Transform;
var P1 : Transform;
var P2 : Transform;

var end_Box_content : GameObject;

var timer = 0.00;

function Start()
{
	end_Box_content.SetActive(false);
}

function Update()
{
	if (isInside)
		movePlayer();
	if (Input.GetButton("Jump_Player1") && canChangeLvl)
	{
		DontDestroyOnLoad(GameObject.Find("Game_Group").gameObject);
		//GameObject.Find("Player_UI").SetActive(true);
		Camera.main.rect.width = 1;
		Player1_movement.canMove = true;
		Player2_movement.canMove = true;
		end_Box_content.SetActive(false);
		Application.LoadLevel(Application.loadedLevel + 1);
	}

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
	if (P1.gameObject.GetComponent.<BoxCollider2D>().size.y != 1)
		P1.gameObject.GetComponent.<BoxCollider2D>().size.y = 1;
	if (P2.gameObject.GetComponent.<BoxCollider2D>().size.y != 1)
		P2.gameObject.GetComponent.<BoxCollider2D>().size.y = 1;
	if ((Vector2.Distance(P1.transform.position, endPos1.transform.position) && Vector2.Distance(P2.transform.position, endPos2.transform.position)) > 0.5 && !isMoved)
	{
		P1.transform.position = Vector2.Lerp(P1.transform.position, endPos1.transform.position, Speed);
		P2.transform.position = Vector2.Lerp(P2.transform.position, endPos2.transform.position, Speed);
		Debug.Log("Movement");
	}
	else
		{	
			Debug.Log("Saut");
			if (GameObject.Find("Player_UI"))
				GameObject.Find("Player_UI").SetActive(false);
			timer += 0.05;
			if (Camera.main.rect.width >= 0.50)
				Camera.main.rect.width -= 0.01;
			if (Camera.main.rect.width <= 0.50)
			{
				end_Box_content.SetActive(true);
				canChangeLvl = true;
			}
			if (timer >= 5.00)
			{
				timer = 0.00;
				if (P1)
					Player1_movement.rb.velocity = new Vector2(0,5);
				if (P2)
					Player2_movement.rb.velocity = new Vector2(0,5);
			}
		}
}
