static var canMove = true;
static var hp = 15;
static var end = 100.0;

var Speed = 0.2;
var explosionForce = 8.0;
var scale;

var jumpForce = 0.0;
var rayPos : Vector2;
var health_bar : GameObject;
var end_bar : GameObject;

private var TimeA = 0.00;
private var distToGround = 0.01;
private var Grounded = true;
private var onLadder = false;
private var isfalling = false;
private var isCrouching = false;
private var Moving = false;

static var rb : Rigidbody2D;
private var Col : BoxCollider2D;

var head;

function Start()
{
	head = this.transform.GetComponentInChildren.<SpriteRenderer>();
	rb = GetComponent.<Rigidbody2D>();
	Col = GetComponent.<BoxCollider2D>();
	scale = this.transform.localScale.x;
}

function Update () {

	if (canMove)
	{	
		setSpeed();
		Movement();
		isGrounded();
		isMoving();
		isFalling();
		LookingSide();
		checkEnd(0);
		checkHealth(0);
		
	}
	
	if (Input.GetKey(KeyCode.R))
		Application.LoadLevel("Game1");
	if (Input.GetButtonDown("Screenshot"))
	{
		checkEnd(-5);
	 	//Application.CaptureScreenshot("Screenshot.png");
		//Debug.Log("SCREEN !");
	}
	 //transform.position = new Vector3(Mathf.Clamp(transform.position.x, cameraRect .xMin, cameraRect .xMax),Mathf.Clamp(transform.position.y, cameraRect .yMin, cameraRect .yMax),transform.position.z);
	health_bar.gameObject.GetComponent("Slider").value = hp;
	end_bar.gameObject.GetComponent("Slider").value = end;
}

function Movement()
{
		if (Input.GetButton("Horizontal_Player1"))
		{
			this.transform.position.x += Mathf.Clamp(Input.GetAxis("Horizontal_Player1"), -Speed, Speed);
		}
		if (Input.GetButton("Jump_Player1") && Grounded && !onLadder)
		{
			rb.velocity = new Vector2(0,jumpForce);
			Grounded = false;
		}
		
		if (Input.GetButtonDown("Crouch_Player1"))
		{
			Col.size.y = 0.5;
			isCrouching = true;
			Speed = 0.02;
		}
		else if (Input.GetButtonUp("Crouch_Player1") && !Physics2D.Raycast(this.transform.position + Vector2(0,0.5), Vector2.up, 0.10))
		{
			Col.size.y = 1;
			isCrouching = false;
			Speed = 0.05;
		}
		
		if (Input.GetButton("Vertical_Player1") && onLadder)
			this.transform.position.y += Mathf.Clamp(Input.GetAxis("Vertical_Player1"), -Speed, Speed);
}

function setSpeed()
{
		if (Input.GetButtonDown("Sprint_Player1") && !onLadder && end > 0)
			Speed = 0.09;
		if (Input.GetButtonUp("Sprint_Player1"))
			Speed = 0.05;
		if (isCrouching && Grounded)
			Speed = 0.02;
		/*if (!isCrouching && Grounded)
			Speed = 0.05;*/
}

function isFalling()
{
	var PosA = this.transform.position.y;
	yield;
	var PosB = this.transform.position.y;
	if (PosA > PosB)
		isfalling = true;
	else
		isfalling = false;
	
}

function isMoving()
{
	var PosA = this.transform.position.x;
	yield;
	var PosB = this.transform.position.x;
	Moving = (PosA != PosB) ? true : false;	
}

function isGrounded()
{
	//Debug.DrawRay(this.transform.position + rayPos, -Vector2.up);
	if (Physics2D.Raycast(this.transform.position + rayPos, -Vector2.up, distToGround))
		Grounded = true;
	if (!(Physics2D.Raycast(this.transform.position + rayPos, -Vector2.up, distToGround)))
		Grounded = false;
}


function LookingSide()
{
	if (Input.GetAxis("Horizontal_Player1") < 0)
		this.transform.localScale.x = -scale;
	else if (Input.GetAxis("Horizontal_Player1") > 0)
		this.transform.localScale.x = scale;
}


function OnTriggerEnter2D(col : Collider2D)
 {
     if (col.gameObject.layer == LayerMask.NameToLayer("Ladder"))
     {
     		onLadder = true;
          	rb.isKinematic = true;
     }
     if (col.gameObject.layer == LayerMask.NameToLayer("Plateform"))
     	transform.parent = col.transform;
     
 }
 
 function OnTriggerExit2D(col : Collider2D)
 {
     if (col.gameObject.layer == LayerMask.NameToLayer("Ladder"))
     {
     		onLadder = false;
          	rb.isKinematic = false;
     }
     if (col.gameObject.layer == LayerMask.NameToLayer("Plateform"))
     	transform.parent = null;
 }

 function OnCollisionEnter2D(col : Collision2D) {
		
		var direction = transform.InverseTransformPoint (col.transform.position);
        if (direction.y > 0f && col.gameObject.tag == "Enemy")
        {
			rb.velocity = new Vector2(jumpForce,jumpForce);
			
		}
		else if (direction.y < 0f && col.gameObject.tag == "Enemy")
			rb.velocity = new Vector2(-jumpForce,jumpForce);
}

 
 function checkHealth(nb : int)
 {
 	Debug.Log(hp);
 	if (nb < 0 && hp > 0){
 		Debug.Log(this.gameObject.name + " a perdu " + (-nb) + " pv.");
 		rb.velocity = new Vector2(3,jumpForce);
 		}
 	else if (nb > 0)
 		Debug.Log(this.gameObject.name + " a gagne " + (nb) + " pv.");
 	this.hp += nb;
 	
 	if (hp > 15)
 		hp = 15;
 	if (hp <= -1)
 		killObject(0);
 }
 
 function checkEnd(nb)
 {
 	TimeA += 0.015;
 	if (Input.GetButton("Sprint_Player1"))
 	 	TimeA = 0.00;
 	if (nb)
 		end += nb;	
 	else if (Input.GetButton("Sprint_Player1") && Moving && end > 0)
 		end -= 0.25;
 	if (TimeA >= 1 && end < 100.0)
 		end += 0.1;

 }
 
function killObject(i)
 {	
 	rb.GetComponent.<Rigidbody2D>().freezeRotation = false;
 	canMove = false;
 	if (i < transform.childCount)
 	{
 		transform.GetChild(i).gameObject.AddComponent(Rigidbody2D);
 		transform.GetChild(i).gameObject.AddComponent(BoxCollider2D);
 		//transform.GetChild(i).GetComponent.<Rigidbody2D>().freezeRotation = true;
 		transform.GetChild(i).GetComponent.<Rigidbody2D>().velocity = new Vector2(Random.Range(-explosionForce,explosionForce),Random.Range(-explosionForce,explosionForce));
 		transform.GetChild(i).transform.parent = null;	
 		killObject(i);
 	}
 	/*if (i >= transform.childCount)
 		Destroy(gameObject);*/
 }