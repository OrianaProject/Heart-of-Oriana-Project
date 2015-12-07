var canMove = true;

var Speed = 0.2;
var scale;

var jumpForce = 0.0;
var distToGround = 0.01;
var rayPos : Vector2;

private var Grounded = true;
private var isfalling = false;
private var rb : Rigidbody2D;

var head;
var Face1 : Sprite;
var Face2 : Sprite;
var Face3 : Sprite;

function Start()
{
	head = this.transform.GetComponentInChildren.<SpriteRenderer>();
	rb = GetComponent.<Rigidbody2D>();
	scale = this.transform.localScale.x;
}

function Update () {

	if (canMove)
	{	
		isGrounded();
		isFalling();
		LookingSide();

		if (Input.GetButtonDown("Sprint_Player1"))
			Speed = 0.12;
		if (Input.GetButtonUp("Sprint_Player1"))
			Speed = 0.08;
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
	}
}

function isFalling()
{
	var PosA = this.transform.position.y;
	yield;
	var PosB = this.transform.position.y;
	if (PosA > PosB)
		head.sprite = Face3;
	
}

function isGrounded()
{
	Debug.DrawRay(this.transform.position + rayPos, -Vector2.up);
	if (Physics2D.Raycast(this.transform.position + rayPos, -Vector2.up, distToGround))
		Grounded = true;
	//head.sprite = Face3;
}


function LookingSide()
{
	if (Input.GetAxis("Horizontal_Player1") < 0)
		this.transform.localScale.x = -scale;
	else if (Input.GetAxis("Horizontal_Player1") > 0)
		this.transform.localScale.x = scale;
}