var canMove = true;
var hp = 15;

var Speed = 0.2;
var scale;

var jumpForce = 0.0;
var distToGround = 0.01;
var rayPos : Vector2;
var health_bar : GameObject;

private var Grounded = true;
private var onLadder = false;
private var isfalling = false;
private var isCrouching = false;

private var rb : Rigidbody2D;
private var Col : BoxCollider2D;

var head;
var Face1 : Sprite;
var Face2 : Sprite;
var Face3 : Sprite;

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
		isFalling();
		LookingSide();
		
	}
	
	if (Input.GetKey(KeyCode.R))
		Application.LoadLevel("Game1");
	if (Input.GetButtonDown("Screenshot"))
	{
	 	Application.CaptureScreenshot("Screenshot.png");
		Debug.Log("SCREEN !");
	}
	health_bar.gameObject.GetComponent("Slider").value = hp;
}

function Movement()
{
		if (Input.GetButton("Horizontal_Player1"))
		{
			head.sprite = Face1;
			this.transform.position.x += Mathf.Clamp(Input.GetAxis("Horizontal_Player1"), -Speed, Speed);
		}
		if (!Input.GetButton("Horizontal_Player1") && Grounded)
			head.sprite = Face2;
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
		if (Input.GetButtonDown("Sprint_Player1") && !onLadder)
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
	{
		isfalling = true;
		if (!onLadder)
			head.sprite = Face3;
	}
	else
		isfalling = false;
	
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
 }
 
 function OnTriggerExit2D(col : Collider2D)
 {
     if (col.gameObject.layer == LayerMask.NameToLayer("Ladder"))
     {
     		onLadder = false;
          	rb.isKinematic = false;
     }
 }
 
 function checkHealth(nb : int)
 {
 	if (nb < 0)
 		Debug.Log(this.gameObject.name + " a perdu " + (-nb) + " pv.");
 	else if (nb > 0)
 		Debug.Log(this.gameObject.name + " a gagne " + (nb) + " pv.");
 	this.hp += nb;
 	
 	if (this.hp <= -1)
 		Destroy(this.gameObject);
 }