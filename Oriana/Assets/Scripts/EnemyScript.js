private var rb : Rigidbody2D;
var hit : RaycastHit[];

private var p1 : GameObject;
private var p2 : GameObject;
private var Current_Key = 0;
private var step = 0.00;
private var goForward = true;
var body : GameObject;
var KeyGroup : Transform;
var item : GameObject;

/*-----STATE----*/

private var normal = true;
private var detect = false;
private var attack = false;

/*--END STATE--*/

var minDist = 1.0;
var maxDist = 5.0;
var Speed = 1.00;
var hp = 15;

function Start()
{
	rb = GetComponent.<Rigidbody2D>();

}

function Update()
{
	if (GameObject.Find("Player1"))
		p1 = GameObject.Find("Player1").gameObject;
	if (GameObject.Find("Player2"))
		p2 = GameObject.Find("Player2").gameObject;
	followPlayer();
	oneDirection();
	if (normal)
		normalState();
}

function nearestPlayer()
{
	var dst1 = Vector2.Distance(this.transform.position, p1.transform.position);
	var dst2 = Vector2.Distance(this.transform.position, p2.transform.position);
	return ((dst1 > dst2) ? p2 : p1);
}

function moveToPlayer(Player : GameObject)
{
	if (Vector2.Distance(body.transform.position, Player.transform.position) < maxDist && Vector2.Distance(body.transform.position, Player.transform.position) > minDist)
	{
		normal = false;
		detect = true;	
		body.transform.position.x = Mathf.Lerp(body.transform.position.x, Player.transform.position.x, Time.deltaTime);
	}
	else
	{
		normal = true;
		detect = false;	
	}
}

function normalState()
{
	if (Vector2.Distance(body.transform.position, KeyGroup.GetChild(Current_Key).transform.position) > 0.1)
	{
		step += Speed * 0.0001;
		body.transform.position.x = Mathf.Lerp(body.transform.position.x, KeyGroup.GetChild(Current_Key).transform.position.x, step);
	}
	if (Vector2.Distance(body.transform.position, KeyGroup.GetChild(Current_Key).transform.position) < 0.1)
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
	if (goForward && (Current_Key + 1) >= KeyGroup.childCount)
			goForward = false;
	else if (!goForward && (Current_Key) <= 0)
			goForward = true;
}


function followPlayer()
{
	if (p1 && p2)
		moveToPlayer(nearestPlayer());
	else if (p1 && !p2)
		moveToPlayer(p1);
	else if (!p1 && p2)
		moveToPlayer(p2);
}

function OnCollisionEnter2D(col : Collision2D) {
		
		var direction = body.transform.InverseTransformPoint (col.transform.position);
        
        /*if (direction.y > 0f && col.gameObject.tag == "Player")
        {
        	dropItem();
			Destroy(this.gameObject);
		}*/
		if ((direction.y < 0f || direction.x > 0f || direction.x < 0f) && col.gameObject.tag == "Player")
		{	
			col.gameObject.SendMessage("checkHealth", -1);
		}
}

function dropItem()
{
	var tem = Instantiate(item, transform.position, transform.rotation);
	tem.transform.position.x += 1;
}
