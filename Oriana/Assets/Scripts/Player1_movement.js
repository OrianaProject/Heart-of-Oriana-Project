var canMove = true;

var Speed = 0.2;
var scale;

var jumpForce = 0.0;
var distToGround = 0.01;
var rayPos : Vector2;

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
		isGrounded();
		isFalling();
		LookingSide();
		Movement();
		
	}
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
		if (Input.GetButton("Jump_Player1") && Grounded)
		{
			rb.velocity = new Vector2(0,jumpForce);
			Grounded = false;
		}
		
		if (Input.GetButtonDown("Crouch_Player1") && Grounded)
		{
			Col.size.y = 0.5;
			isCrouching = true;
		}
		else if (Input.GetButtonUp("Crouch_Player1") && !Physics2D.Raycast(this.transform.position + Vector2(0,0.5), Vector2.up, 0.10))
		{
			Col.size.y = 1;
			isCrouching = false;
		}
}

function setSpeed()
{
		if (Input.GetButtonDown("Sprint_Player1") && !isCrouching && Grounded)
			Speed = 0.12;
		if (Input.GetButtonUp("Sprint_Player1") && !isCrouching)
			Speed = 0.08;
		if (isCrouching)
			Speed = 0.02;
		if (!isCrouching)
			Speed = 0.08;
}

function isFalling()
{
	var PosA = this.transform.position.y;
	yield;
	var PosB = this.transform.position.y;
	if (PosA > PosB)
	{
		isfalling = true;
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
}


function LookingSide()
{
	if (Input.GetAxis("Horizontal_Player1") < 0)
		this.transform.localScale.x = -scale;
	else if (Input.GetAxis("Horizontal_Player1") > 0)
		this.transform.localScale.x = scale;
}

function OnCollisionEnter2D(collision : Collision2D)
 {
     if (collision.collider.gameObject.layer == LayerMask.NameToLayer("Ladder"))
     {
          Debug.Log("Touched a rail");
     }
 }