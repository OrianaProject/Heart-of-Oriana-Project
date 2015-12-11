private var rb : Rigidbody2D;
var hit : RaycastHit[];

private var p1 : GameObject;
private var p2 : GameObject;
var item : GameObject;


var Speed = 1.00;
var hp = 15;

function Start()
{
	rb = GetComponent.<Rigidbody2D>();
	if (GameObject.Find("Player1"))
		p1 = GameObject.Find("Player1").gameObject;
	if (GameObject.Find("Player2"))
		p2 = GameObject.Find("Player2").gameObject;
}

function Update()
{
	followPlayer();
}

function nearestPlayer(j1, j2)
{
	var dst1 = Vector2.Distance(this.transform.position, p1.transform.position);
	var dst2 = Vector2.Distance(this.transform.position, p2.transform.position);
	if (dst1 > dst2)
		return (p2);
	return (p1);
}

function moveToPlayer(Player : GameObject)
{
	this.transform.position = Vector2.MoveTowards(new Vector2(transform.position.x, transform.position.y), Player.transform.position, Speed * Time.deltaTime);
}

function followPlayer()
{
	if (p1 && p2)
		moveToPlayer(nearestPlayer(p1, p2));
	else if (p1 && !p2)
		moveToPlayer(p1);
	else if (!p1 && p2)
		moveToPlayer(p2);
}

function OnCollisionEnter2D(col : Collision2D) {
		
		var direction = transform.InverseTransformPoint (col.transform.position);
        if (direction.y > 0f && col.gameObject.tag == "Player")
        {
        	dropItem();
			Destroy(this.gameObject);
		}
		else if (direction.y < 0f && col.gameObject.tag == "Player")
			col.gameObject.SendMessage("checkHealth", -1);


}

function dropItem()
{
	var tem = Instantiate(item, transform.position, transform.rotation);
	tem.transform.position.x += 1;
}